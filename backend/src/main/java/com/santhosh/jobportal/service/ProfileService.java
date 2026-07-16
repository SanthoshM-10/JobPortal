package com.santhosh.jobportal.service;

import com.santhosh.jobportal.dto.ProfileRequest;
import com.santhosh.jobportal.dto.ProfileResponse;
import com.santhosh.jobportal.model.User;
import com.santhosh.jobportal.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final UserRepository userRepository;

    public ProfileResponse getMyProfile(Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        ProfileResponse response = new ProfileResponse();

        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setPhone(user.getPhone());
        response.setLocation(user.getLocation());
        response.setSkills(user.getSkills());
        response.setEducation(user.getEducation());
        response.setExperience(user.getExperience());
        response.setLinkedin(user.getLinkedin());
        response.setGithub(user.getGithub());
        response.setResumeUrl(user.getResumeUrl());

        return response;
    }

    public ProfileResponse updateProfile(
            ProfileRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setPhone(request.getPhone());
        user.setLocation(request.getLocation());
        user.setSkills(request.getSkills());
        user.setEducation(request.getEducation());
        user.setExperience(request.getExperience());
        user.setLinkedin(request.getLinkedin());
        user.setGithub(request.getGithub());

        userRepository.save(user);

        return getMyProfile(authentication);
    }

}