package com.santhosh.jobportal.config;

import com.santhosh.jobportal.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration)
            throws Exception {

        return configuration.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(List.of("http://localhost:5173"));

        configuration.setAllowedMethods(List.of(
                "GET",
                "POST",
                "PUT",
                "DELETE",
                "OPTIONS"
        ));

        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http

                .cors(Customizer.withDefaults())

                .csrf(csrf -> csrf.disable())

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS))

                .authorizeHttpRequests(auth -> auth

                        // Allow CORS preflight requests
                        .requestMatchers(HttpMethod.OPTIONS, "/**")
                        .permitAll()

                        // Public APIs
                        .requestMatchers(
                                "/auth/**",
                                "/v3/api-docs/**",
                                "/swagger-ui/**",
                                "/swagger-ui.html"
                        ).permitAll()

                        // ===================== JOB APIs =====================

                        // View jobs
                        .requestMatchers(HttpMethod.GET, "/jobs/**")
                        .hasAnyRole("JOB_SEEKER", "RECRUITER", "ADMIN")

                        // Add jobs
                        .requestMatchers(HttpMethod.POST, "/jobs/**")
                        .hasAnyRole("RECRUITER", "ADMIN")

                        // Edit jobs
                        .requestMatchers(HttpMethod.PUT, "/jobs/**")
                        .hasAnyRole("RECRUITER", "ADMIN")

                        // Delete jobs
                        .requestMatchers(HttpMethod.DELETE, "/jobs/**")
                        .hasRole("ADMIN")

                        // ================= APPLICATION APIs =================

                        // Job seeker can apply
                        .requestMatchers(HttpMethod.POST, "/applications")
                        .hasRole("JOB_SEEKER")

                        // Job seeker can view own applications
                        .requestMatchers(HttpMethod.GET, "/applications/my")
                        .hasRole("JOB_SEEKER")

                        // Recruiter/Admin can view applicants
                        .requestMatchers(HttpMethod.GET, "/applications/job/**")
                        .hasAnyRole("RECRUITER", "ADMIN")

                        // Recruiter/Admin can update application status
                        .requestMatchers(HttpMethod.PUT, "/applications/**")
                        .hasAnyRole("RECRUITER", "ADMIN")

                        // ================= RESUME APIs =================

                        // Upload resume
                        .requestMatchers(HttpMethod.POST, "/resume/upload")
                        .hasRole("JOB_SEEKER")

                        // View own resume
                        .requestMatchers(HttpMethod.GET, "/resume/my")
                        .hasRole("JOB_SEEKER")

                        // Download resume
                        .requestMatchers(HttpMethod.GET, "/resume/**")
                        .hasAnyRole("JOB_SEEKER", "RECRUITER", "ADMIN")

                        // ================= PROFILE APIs =================

                        .requestMatchers(HttpMethod.GET, "/profile/me")
                        .hasAnyRole("JOB_SEEKER", "RECRUITER", "ADMIN")

                        .requestMatchers(HttpMethod.PUT, "/profile/me")
                        .hasAnyRole("JOB_SEEKER", "RECRUITER", "ADMIN")

                        .requestMatchers(HttpMethod.POST, "/profile/image/upload")
                        .hasAnyRole("JOB_SEEKER", "RECRUITER", "ADMIN")

                        .requestMatchers(HttpMethod.GET, "/profile/image/my")
                        .hasAnyRole("JOB_SEEKER", "RECRUITER", "ADMIN")

                        .requestMatchers(HttpMethod.GET, "/profile/image/**")
                        .hasAnyRole("JOB_SEEKER", "RECRUITER", "ADMIN")

                                // ================= SAVED JOB APIs =================

                        // Job Seeker can save a job
                        .requestMatchers(HttpMethod.POST, "/saved-jobs/**")
                        .hasRole("JOB_SEEKER")

                        // Job Seeker can remove a saved job
                        .requestMatchers(HttpMethod.DELETE, "/saved-jobs/**")
                        .hasRole("JOB_SEEKER")

                        // Job Seeker can view saved jobs
                        .requestMatchers(HttpMethod.GET, "/saved-jobs")
                        .hasRole("JOB_SEEKER")

                        // Job Seeker can check whether a job is saved
                        .requestMatchers(HttpMethod.GET, "/saved-jobs/check/**")
                        .hasRole("JOB_SEEKER")

                        .requestMatchers(HttpMethod.GET, "/dashboard")
                        .hasRole("RECRUITER")

                        .anyRequest().authenticated()

                )

                .httpBasic(httpBasic -> httpBasic.disable())

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}