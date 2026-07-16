package com.santhosh.jobportal.security;

import com.santhosh.jobportal.service.CustomUserDetailsService;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;

    public JwtAuthenticationFilter(JwtService jwtService,
                                   CustomUserDetailsService userDetailsService) {

        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        System.out.println("\n========== JWT FILTER ==========");
        System.out.println("Request URI : " + request.getRequestURI());
        System.out.println("HTTP Method : " + request.getMethod());

        String authHeader = request.getHeader("Authorization");

        System.out.println("Authorization Header : " + authHeader);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {

            System.out.println("No Bearer Token Found");

            filterChain.doFilter(request, response);

            return;
        }

        try {

            String token = authHeader.substring(7);

            String email = jwtService.extractUsername(token);

            System.out.println("Email : " + email);

            UserDetails userDetails =
                    userDetailsService.loadUserByUsername(email);

            System.out.println("Loaded User : "
                    + userDetails.getUsername());

            System.out.println("Authorities :");

            userDetails.getAuthorities()
                    .forEach(authority ->
                            System.out.println(authority.getAuthority()));

            boolean valid =
                    jwtService.isTokenValid(
                            token,
                            userDetails.getUsername()
                    );

            System.out.println("Token Valid : " + valid);

            if (valid &&
                    SecurityContextHolder.getContext()
                            .getAuthentication() == null) {

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );

                authentication.setDetails(
                        new WebAuthenticationDetailsSource()
                                .buildDetails(request)
                );

                SecurityContextHolder
                        .getContext()
                        .setAuthentication(authentication);

                System.out.println("Authentication Successful");

                System.out.println(
                        "Security Context Authorities : "
                                + SecurityContextHolder
                                .getContext()
                                .getAuthentication()
                                .getAuthorities()
                );
            }

        } catch (ExpiredJwtException e) {

            System.out.println("JWT Token Expired");

        } catch (Exception e) {

            System.out.println("JWT Authentication Error");

            e.printStackTrace();
        }

        filterChain.doFilter(request, response);
    }
}