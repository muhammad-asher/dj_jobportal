import React, { useEffect, useState } from 'react';
import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Box,
  styled,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import apiRequest from '../api/apiRequest';

const StyledPaper = styled(Paper)({
  background: '#f0f0f0',
  padding: '20px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
});

const JobListings: React.FC = () => {
  const [jobListings, setJobListings] = useState<any>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get('page') || '1', 10);

  const fetchJobListings = (currentPage: number) => {
    apiRequest
      .get(`api/jobs-list/?page=${currentPage}`)
      .then((response: any) => setJobListings(response.data.results))
      .catch((error: any) => console.error('Error fetching job listings:', error));
  };

  useEffect(() => {
    fetchJobListings(currentPage)
  }, [currentPage]);

  const handleJobDetail = (jobId:any) => {
    console.log(`JobId: ${jobId}`);
    navigate(`/job-detail/${jobId}`)
  };

  const handlePageChange = (newPage:any, direction:any) => {
    queryParams.set('page', newPage);
    navigate(`?${queryParams.toString()}`);
  };

  return (
    <div style={{ margin: '70px' }}>
      <Typography variant="h4">Job Listings</Typography>
      <StyledPaper elevation={3}>
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Posted By</TableCell>
                <TableCell>Applicants</TableCell>
                <TableCell>Skills Required</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobListings.map((job:any) => (
                <TableRow key={job.id}>
                  <TableCell>{job.title}</TableCell>
                  <TableCell>{job.description}</TableCell>
                  <TableCell>{`User ${job.posted_by}`}</TableCell>
                  <TableCell>{job.applicants.length}</TableCell>
                  <TableCell>
                    {job.skills_required.map((skill:any) => (
                      <span key={skill.id}>{skill.name}, </span>
                    ))}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleJobDetail(job.id)}
                    >
                      Job Detail
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box mt={2} display="flex" justifyContent="center">
          <Button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1, 'prev')}
          >
            Previous
          </Button>
          <Typography variant="body2" style={{ margin: '0 10px' }}>
            Page {currentPage}
          </Typography>
          <Button
            disabled={!jobListings.length}
            onClick={() => handlePageChange(currentPage + 1, 'next')}
          >
            Next
          </Button>
        </Box>
      </StyledPaper>
    </div>
  );
};

export default JobListings;
