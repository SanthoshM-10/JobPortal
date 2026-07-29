package com.santhosh.jobportal.service;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    @Value("${spring.mail.username}")
    private String username;

    @PostConstruct
    public void test() {
        System.out.println("Mail Username: " + username);
    }

    private final JavaMailSender mailSender;

    public void sendEmail(String to, String subject, String body) {

        System.out.println("Inside EmailService");

        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(username);
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);

        System.out.println("Before sending email");

        mailSender.send(message);

        System.out.println("Email sent successfully to: " + to);
    }
}