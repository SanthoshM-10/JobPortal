package com.santhosh.jobportal.service;

import com.santhosh.jobportal.dto.*;
import com.santhosh.jobportal.model.User;
import com.santhosh.jobportal.repository.UserRepository;
import com.santhosh.jobportal.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final OtpService otpService;
    private final EmailService emailService;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService,
                       OtpService otpService,
                       EmailService emailService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.otpService = otpService;
        this.emailService = emailService;
    }

    public RegisterResponse register(RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());

        user.setPassword(passwordEncoder.encode(request.getPassword()));

        user.setRole("JOB_SEEKER");

        User savedUser = userRepository.save(user);

        return new RegisterResponse(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail(),
                savedUser.getRole()
        );
    }

    public AuthenticationResponse login(LoginRequest request) {

        System.out.println("=================================");
        System.out.println("Entered Email : " + request.getEmail());

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Invalid email or password"));

        System.out.println("Database Email : " + user.getEmail());

        System.out.println("Entered Password : " + request.getPassword());
        System.out.println("Stored Password : " + user.getPassword());

        boolean matches = passwordEncoder.matches(
                request.getPassword(),
                user.getPassword());

        System.out.println("Password Match : " + matches);

        if (!matches) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtService.generateToken(user.getEmail());

        System.out.println("Generated Token : " + token);

        return new AuthenticationResponse(
                token,
                user.getName(),
                user.getEmail(),
                user.getRole()
        );
    }

    // ==========================
    // FORGOT PASSWORD
    // ==========================

    public String forgotPassword(ForgotPasswordRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Email not found"));

        String otp = otpService.generateOtp();

        user.setOtp(otp);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(5));
        user.setOtpVerified(false);

        userRepository.save(user);

        emailService.sendEmail(
                user.getEmail(),
                "Password Reset OTP",
                "Your OTP is: " + otp +
                        "\n\nThis OTP is valid for 5 minutes."
        );

        return "OTP sent successfully.";

    }

    public String verifyOtp(VerifyOtpRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Email not found"));

        if (user.getOtp() == null) {
            throw new RuntimeException("Generate OTP first.");
        }

        if (!user.getOtp().equals(request.getOtp())) {
            throw new RuntimeException("Invalid OTP.");
        }

        if (user.getOtpExpiry().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("OTP expired.");
        }

        user.setOtpVerified(true);

        userRepository.save(user);

        return "OTP verified successfully.";

    }

    public String resetPassword(ResetPasswordRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Email not found"));

        if (!Boolean.TRUE.equals(user.getOtpVerified())) {
            throw new RuntimeException("Verify OTP first.");
        }

        user.setPassword(
                passwordEncoder.encode(request.getNewPassword())
        );

        user.setOtp(null);
        user.setOtpExpiry(null);
        user.setOtpVerified(false);

        userRepository.save(user);

        return "Password reset successfully.";

    }

}