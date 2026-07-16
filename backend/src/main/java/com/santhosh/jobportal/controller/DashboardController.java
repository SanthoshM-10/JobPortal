package com.santhosh.jobportal.controller;

import com.santhosh.jobportal.dto.DashboardResponse;
import com.santhosh.jobportal.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
@CrossOrigin
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping
    public ResponseEntity<DashboardResponse> getDashboard() {

        DashboardResponse response = dashboardService.getDashboard();

        return ResponseEntity.ok(response);

    }

}