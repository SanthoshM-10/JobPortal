package com.santhosh.jobportal.service;

import com.resend.Resend;
import com.resend.services.emails.model.CreateEmailOptions;
import com.resend.services.emails.model.CreateEmailResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final Resend resend;

    public EmailService(
            @Value("${resend.api.key}") String apiKey) {

        this.resend = new Resend(apiKey);
    }

    public void sendEmail(String to,
                          String subject,
                          String body) {

        try {

            CreateEmailOptions email =
                    CreateEmailOptions.builder()
                            .from("JobPortal <onboarding@resend.dev>")
                            .to(to)
                            .subject(subject)
                            .text(body)
                            .build();

            CreateEmailResponse response =
                    resend.emails().send(email);

            System.out.println("Email sent successfully");
            System.out.println(response.getId());

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}