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
  Card,
  CardContent,
} from '@mui/material';
import axiosInstance from '../utils/axiosConfig';

const StyledPaper = styled(Paper)({
  background: 'linear-gradient(60deg, grey, black)',
  padding: '20px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
});

const JobListings: React.FC = () => {
  const [jobListings, setJobListings] = useState([]);

  useEffect(() => {
    axiosInstance
      .get('jobs-list')
      .then((response:any) => setJobListings(response.data.results))
      .catch((error:any) => console.error('Error fetching job listings:', error));
  }, []);

  const handleApply = (jobId:any) => {
    console.log(`Applying for job with ID: ${jobId}`);
  };

  return (
    <div style={{ margin: '100px' }}>
      <Typography variant="h4" style={{ margin: '10px' }} >Job Listings</Typography>
      <StyledPaper elevation={3}>
        <TableContainer component={Paper} style={{ marginTop: '10px' }}>
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
                      onClick={() => handleApply(job.id)}
                    >
                      Apply
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledPaper>
    </div>
  );
};

export default JobListings;
