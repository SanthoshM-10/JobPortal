package com.santhosh.jobportal.controller;


import com.santhosh.jobportal.dto.JobRequestDTO;
import com.santhosh.jobportal.dto.JobResponseDTO;
import com.santhosh.jobportal.model.Job;
import com.santhosh.jobportal.service.JobService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class JobController {

//    @Autowired
//    private JobService service;

    private final JobService jobService;
    private final ModelMapper modelMapper;

    public JobController(JobService jobService, ModelMapper modelMapper){
        this.jobService = jobService;
        this.modelMapper = modelMapper;
    }

    @RequestMapping("/")
    public String greet(){
        return "Omm Namah Shivayya";
    }

//    @GetMapping("/jobs")
//    public List<Job> getAllJobs(){
//        return jobService.getAllJobs();
//    }

//    @GetMapping("/jobs")
//    public ResponseEntity<List<Job>> getAllJobs(){
//        List<Job> allJobs = jobService.getAllJobs();
//        return new ResponseEntity<>(allJobs,HttpStatus.OK);
//    }

    @GetMapping("/jobs")
    public ResponseEntity<List<JobResponseDTO>> getAllJobs() {
        List<JobResponseDTO> allJobs = jobService.getAllJobs();
        return new ResponseEntity<>(allJobs, HttpStatus.OK);
    }

//    @PostMapping("/jobs")                       //changed because we ar jumping into the validation
//    public Job addJob(@Valid @RequestBody Job job){
//        return jobService.addJob(job);
//    }

//    @PostMapping("/jobs")                      //changed because we are jumping into the DTO(Data Transfer Object)
//    public ResponseEntity<Job> addJob(@Valid @RequestBody Job job){
//        Job savedJob = jobService.addJob(job);
//        return new ResponseEntity<>(savedJob,HttpStatus.CREATED);
//    }


    @PostMapping("/jobs")
    public ResponseEntity<JobResponseDTO> addJob(
            @Valid @RequestBody JobRequestDTO dto) {

        JobResponseDTO savedJob = jobService.addJob(dto);

        return new ResponseEntity<>(savedJob, HttpStatus.CREATED);
    }

    //    @GetMapping("/jobs/search")
//    public ResponseEntity<List<JobResponseDTO>> searchJobs(@RequestParam String keyword){
//        List<JobResponseDTO> job = jobService.searchJobs(keyword);
//        return new ResponseEntity<>(job, HttpStatus.OK);
//    }

    @GetMapping("/jobs/search")
    public ResponseEntity<Page<JobResponseDTO>> searchJobs(

            @RequestParam(required = false) String keyword,

            @RequestParam(required = false) String location,

            @RequestParam(required = false) String jobType,

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "10") int size

    ) {

        Pageable pageable = PageRequest.of(page, size);

        Page<JobResponseDTO> jobs = jobService.searchJobs(
                keyword,
                location,
                jobType,
                pageable
        );

        return ResponseEntity.ok(jobs);

    }

//    @PutMapping("/jobs/{id}")
//    public Job updateJob(@PathVariable Integer id,
//                         @Valid @RequestBody Job job){
//        return jobService.updateJob(id,job);
//    }

//    @PutMapping("/jobs/{id}")
//    public ResponseEntity<Job> updateJob(@PathVariable Integer id,
//                         @Valid @RequestBody Job job){
//        Job updatedJob = jobService.updateJob(id,job);
//        return new ResponseEntity<>(updatedJob,HttpStatus.OK);
//    }

    @PutMapping("/jobs/{id}")
    public ResponseEntity<JobResponseDTO> updateJob(@PathVariable Integer id,
                                                    @Valid @RequestBody JobRequestDTO dto){
        JobResponseDTO job = jobService.updateJob(id,dto);
        return new ResponseEntity<>(job, HttpStatus.OK);
    }


//    @DeleteMapping("/jobs/{id}")
//    public String deleteJobById(@PathVariable Integer id){
//        jobService.deleteJobById(id);
//        return "Job deleted successfully.";
//    }

    @DeleteMapping("/jobs/{id}")
    public ResponseEntity<String> deleteJobById(@PathVariable Integer id){
        jobService.deleteJobById(id);
        return ResponseEntity.ok("Job deleted successfully.");
    }

    @GetMapping("/jobs/my")
    public ResponseEntity<List<JobResponseDTO>> getMyJobs() {

        System.out.println("========== MY JOBS CONTROLLER ==========");

        List<JobResponseDTO> jobs = jobService.getMyJobs();

        return ResponseEntity.ok(jobs);
    }

//    @GetMapping("/jobs/{id}")        //changed because we are jumping into the DTO(Data Transfer Object)
//    public Job getJobById(@PathVariable Integer id){
//        return jobService.getJobById(id);
//    }

    @GetMapping("/jobs/{id}")
    public ResponseEntity<JobResponseDTO> getJobById(@PathVariable Integer id){
        JobResponseDTO job = jobService.getJobById(id);
        return new ResponseEntity<>(job, HttpStatus.OK);
    }

//    @GetMapping("/jobs/company/{company}")
//    public ResponseEntity<List<Job>> getAllJobsByCompany(@PathVariable String company){
//        List<Job> allJobsByCompany = jobService.getAllJobsByCompany(company);
//        return new ResponseEntity<>(allJobsByCompany, HttpStatus.OK);
//    }

    @GetMapping("/jobs/company/{company}")
    public ResponseEntity<List<JobResponseDTO>> getAllJobsByCompany(@PathVariable String company){
        List<JobResponseDTO> job = jobService.getAllJobsByCompany(company);
        return new ResponseEntity<>(job, HttpStatus.OK);
    }

//    @GetMapping("/jobs/location/{location}")
//    public ResponseEntity<List<Job>> getAllJobsByLocation(@PathVariable String location){
//        List<Job> allJobsByLocation = jobService.getAllJobsByLocation(location);
//        return new ResponseEntity<>(allJobsByLocation, HttpStatus.ACCEPTED);
//    }

    @GetMapping("/jobs/location/{location}")
    public ResponseEntity<List<JobResponseDTO>> getAllJobsByLocation(@PathVariable String location){
        List<JobResponseDTO> job = jobService.getAllJobsByLocation(location);
        return new ResponseEntity<>(job, HttpStatus.OK);
    }


//    @GetMapping("/jobs/jobType/{jobType}")
//    public ResponseEntity<List<Job>> getAllJobsByJobType(@PathVariable String jobType){
//        List<Job> allJobsByJobType = jobService.getAllJobsByJobType(jobType);
//        return new ResponseEntity<>(allJobsByJobType, HttpStatus.OK);
//    }

    @GetMapping("/jobs/jobType/{jobType}")
    public ResponseEntity<List<JobResponseDTO>> getAllJobsByJobType(@PathVariable String jobType){
        List<JobResponseDTO> job = jobService.getAllJobsByJobType(jobType);
        return new ResponseEntity<>(job, HttpStatus.OK);
    }

//    @GetMapping("/jobs/experience/{experience}")
//    public ResponseEntity<List<Job>> getAllJobsByExperience(@PathVariable Integer experience) {
//        List<Job> allJobsByExperience = jobService.getAllJobsByExperience(experience);
//        return new ResponseEntity<>(allJobsByExperience, HttpStatus.OK);
//    }

    @GetMapping("/jobs/experience/{experience}")
    public ResponseEntity<List<JobResponseDTO>> getAllJobsByExperience(@PathVariable Integer experience){
        List<JobResponseDTO> job = jobService.getAllJobsByExperience(experience);
        return new ResponseEntity<>(job, HttpStatus.OK);
    }


    @GetMapping("/jobs/page")
    public ResponseEntity<Page<Job>> getJobs(Pageable pageable){
        Page<Job> jobs = jobService.getJobs(pageable);
        return new ResponseEntity<>(jobs, HttpStatus.OK);
    }




}
