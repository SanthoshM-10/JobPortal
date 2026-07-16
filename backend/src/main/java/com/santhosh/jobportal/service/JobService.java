package com.santhosh.jobportal.service;



import com.santhosh.jobportal.dto.JobRequestDTO;
import com.santhosh.jobportal.dto.JobResponseDTO;
import com.santhosh.jobportal.exception.JobNotFoundException;
import com.santhosh.jobportal.model.Job;
import com.santhosh.jobportal.model.User;
import com.santhosh.jobportal.repository.ApplicationRepository;
import com.santhosh.jobportal.repository.JobRepository;
import com.santhosh.jobportal.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

    private final JobRepository jobRepository;

    private final ModelMapper modelMapper;

    private final UserRepository userRepository;

    private final ApplicationRepository applicationRepository;


    public JobService(JobRepository jobRepository, UserRepository userRepository, ModelMapper modelMapper, ApplicationRepository applicationRepository){
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.applicationRepository = applicationRepository;
    }

//    public List<Job> getAllJobs(){
//        return jobRepository.findAll();
//    }

    public List<JobResponseDTO> getAllJobs() {
        List<Job> jobs = jobRepository.findAll();

        return jobs.stream()
                .map(job -> modelMapper.map(job, JobResponseDTO.class))
                .toList();
    }

//    public Job addJob(Job job){
//        return jobRepository.save(job);
//    }


    // DTO -> Entity -> Database -> Entity -> DTO
//    public JobResponseDTO addJob(JobRequestDTO dto) {       //this is replaced by below code because we have to use ModelMapper
//
//        // Convert RequestDTO to Entity
//        Job job = new Job();
//
//        job.setTitle(dto.getTitle());
//        job.setCompany(dto.getCompany());
//        job.setLocation(dto.getLocation());
//        job.setSalary(dto.getSalary());
//        job.setExperience(dto.getExperience());
//        job.setJobType(dto.getJobType());
//        job.setDescription(dto.getDescription());
//        job.setSkills(dto.getSkills());
//        job.setPostedDate(dto.getPostedDate());
//
//        // Save entity in database
//        Job savedJob = jobRepository.save(job);
//
//        // Convert Entity to ResponseDTO
//        JobResponseDTO response = new JobResponseDTO();
//
//        response.setId(savedJob.getId());
//        response.setTitle(savedJob.getTitle());
//        response.setCompany(savedJob.getCompany());
//        response.setLocation(savedJob.getLocation());
//        response.setSalary(savedJob.getSalary());
//        response.setExperience(savedJob.getExperience());
//        response.setJobType(savedJob.getJobType());
//        response.setDescription(savedJob.getDescription());
//        response.setSkills(savedJob.getSkills());
//        response.setPostedDate(savedJob.getPostedDate());
//
//        return response;
//    }


//    public JobResponseDTO addJob(JobRequestDTO dto){
//        Job job = modelMapper.map(dto, Job.class);
//
//        Job savedJob = jobRepository.save(job);
//
//        return modelMapper.map(savedJob,JobResponseDTO.class);
//    }

    public JobResponseDTO addJob(JobRequestDTO dto) {

        Job job = modelMapper.map(dto, Job.class);

        // Logged-in user's email
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        // Find recruiter
        User recruiter = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Recruiter not found"));

        // Assign recruiter
        job.setRecruiter(recruiter);

        Job savedJob = jobRepository.save(job);

        return modelMapper.map(savedJob, JobResponseDTO.class);
    }

//    public Job updateJob(Integer id, Job job){
//        job.setId(id);
//        return jobRepository.save(job);
//    }

//    public JobResponseDTO updateJob(Integer id, JobRequestDTO dto){
//        Job job = jobRepository.findById(id).orElse(null);
//
//
//        //After fetching the job from the database, you need to update its fields.
//        job.setTitle(dto.getTitle());
//        job.setCompany(dto.getCompany());
//        job.setLocation(dto.getLocation());
//        job.setSalary(dto.getSalary());
//        job.setExperience(dto.getExperience());
//        job.setJobType(dto.getJobType());
//        job.setDescription(dto.getDescription());
//        job.setSkills(dto.getSkills());
//        job.setPostedDate(dto.getPostedDate());
//
//        Job updatedJob = jobRepository.save(job);
//
//        return modelMapper.map(job, JobResponseDTO.class);
//    }

    public JobResponseDTO updateJob(Integer id, JobRequestDTO dto){
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new JobNotFoundException("Job not found with id: "+id));

        //After fetching the job from the database, you need to update its fields.
        job.setTitle(dto.getTitle());
        job.setCompany(dto.getCompany());
        job.setLocation(dto.getLocation());
        job.setSalary(dto.getSalary());
        job.setExperience(dto.getExperience());
        job.setJobType(dto.getJobType());
        job.setDescription(dto.getDescription());
        job.setSkills(dto.getSkills());
        job.setPostedDate(dto.getPostedDate());

        Job updatedJob = jobRepository.save(job);

        return modelMapper.map(updatedJob, JobResponseDTO.class);
    }

    //This will not work with the DTO, because there is no data to return from the data after deleting.
//    public void deleteJobById(Integer id){
//        jobRepository.deleteById(id);
//    }

//    public void deleteJobById(Integer id){
//        Job job = jobRepository.findById(id)
//                .orElseThrow(() -> new JobNotFoundException("Job not found with id: "+id));
//
//        jobRepository.deleteById(id);
//    }

    @Transactional
    public void deleteJobById(Integer id) {

        Job job = jobRepository.findById(id)
                .orElseThrow(() ->
                        new JobNotFoundException(
                                "Job not found with id: " + id));

        applicationRepository.deleteByJob(job);

        jobRepository.delete(job);

    }

//    public Job getJobById(Integer id) {
//        return jobRepository.findById(id).orElse(null);
//    }


//    public JobResponseDTO getJobById(Integer id){        //replaced by below code because of exception handling concept
//        Job job = jobRepository.findById(id).orElse(null);
//
//        if(job==null){
//            return null;
//        }
//        return modelMapper.map(job, JobResponseDTO.class);
//    }

    public JobResponseDTO getJobById(Integer id){
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new JobNotFoundException("Job not found with id: "+id));

        return modelMapper.map(job, JobResponseDTO.class);
    }

//    public List<Job> getAllJobsByCompany(String company){
//        return jobRepository.findByCompany(company);
//    }

    public List<JobResponseDTO> getAllJobsByCompany(String company){
        List<Job> allJobsByCompany = jobRepository.findByCompany(company);
        return allJobsByCompany
                .stream()
                .map(job -> modelMapper.map(job, JobResponseDTO.class))
                .toList();
    }

//    public List<Job> getAllJobsByLocation(String location){
//        return jobRepository.findByLocation(location);
//    }

    public List<JobResponseDTO> getAllJobsByLocation(String location){
        List<Job> allJobsByLocation = jobRepository.findByLocation(location);
        return allJobsByLocation
                .stream()
                .map(job -> modelMapper.map(job, JobResponseDTO.class))
                .toList();
    }

//    public List<Job> getAllJobsByJobType(String jobType){
//        return jobRepository.findByJobType(jobType);
//    }

    public List<JobResponseDTO> getAllJobsByJobType(String jobType) {

        List<Job> allJobsByJobType = jobRepository.findByJobType(jobType);

        return allJobsByJobType
                .stream()
                .map(job -> modelMapper.map(job, JobResponseDTO.class))
                .toList();
    }

//    public List<Job> getAllJobsByExperience(Integer experience){
//        return jobRepository.findByExperience(experience);
//    }

    public List<JobResponseDTO> getAllJobsByExperience(Integer experience){
        List<Job>  allJobsByExperience = jobRepository.findByExperience(experience);
        return allJobsByExperience
                .stream()
                .map(job -> modelMapper.map(job, JobResponseDTO.class))
                .toList();

    }

//    public List<JobResponseDTO> searchJobs(String keyword){
//        List<Job> jobs = jobRepository.searchJobs(keyword);
//        return jobs.stream()
//                .map(job -> modelMapper.map(job, JobResponseDTO.class))
//                .toList();
//    }

    public Page<JobResponseDTO> searchJobs(
            String keyword,
            String location,
            String jobType,
            Pageable pageable) {

        // Convert empty strings to null
        if (keyword != null && keyword.isBlank()) {
            keyword = null;
        }

        if (location != null && location.isBlank()) {
            location = null;
        }

        if (jobType != null && jobType.isBlank()) {
            jobType = null;
        }

        // Fetch filtered jobs from repository
        Page<Job> jobs = jobRepository.searchJobs(
                keyword,
                location,
                jobType,
                pageable
        );

        // Convert Entity -> DTO
        return jobs.map(job ->
                modelMapper.map(job, JobResponseDTO.class)
        );

    }

    public Page<Job> getJobs(Pageable pageable){
        return jobRepository.findAll(pageable);
    }

    public List<JobResponseDTO> getMyJobs() {
        System.out.println("========== MY JOBS SERVICE ==========");

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();
        System.out.println("Logged in Email : " + email);

        User recruiter = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Recruiter not found"));

        System.out.println("Recruiter ID : " + recruiter.getId());

        List<Job> jobs = jobRepository.findByRecruiter(recruiter);

        System.out.println("Jobs Found : " + jobs.size());

        jobs.forEach(job ->
                System.out.println(job.getId() + " -> " + job.getTitle()));

        return jobs.stream()
                .map(job -> modelMapper.map(job, JobResponseDTO.class))
                .toList();
    }
}
