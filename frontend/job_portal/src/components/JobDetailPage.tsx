import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container, Typography, Paper, Modal, Backdrop, Fade } from '@mui/material';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import apiRequest from '../api/apiRequest';
import { displaySuccessMessage } from '../utils/notify';
import { ToastContainer } from 'react-toastify';

interface JobDetail {
  id: number;
  applicants: {
    id: number;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
  }[];
  posted_by: {
    id: number;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
  };
  skills_required: string[];
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

interface FormData {
  resume: FileList;
}

const JobDetailPage: React.FC = () => {
  const { jobid } = useParams<{ jobid: string }>();
  const [jobDetail, setJobDetail] = useState<JobDetail | null>(null);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<FormData>();

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const response = await apiRequest.get(`api/job/${jobid}`);
        setJobDetail(response.data);
      } catch (error) {
        console.error('Error fetching job detail:', error);
      }
    };

    fetchJobDetail();
  }, [jobid]);

  const handleApply: SubmitHandler<FormData> = async (data) => {
    const formData = new FormData();
    formData.append('resume', data.resume[0]);

    try {
      const response = await apiRequest.post(`api/apply/${jobid}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
      displaySuccessMessage("Application Submitted Successfully")
      handleClose();
    } catch (error) {
      console.error('Error applying for job:', error);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh', // 80% of the viewport height
      }}
    >
      <ToastContainer/> 
      <Paper elevation={3} sx={{ padding: 3, width: '100%', textAlign: 'center' }}>
        {jobDetail ? (
          <>
            <Typography
              sx={{
                backgroundColor: 'black',
                color: 'white',
                borderRadius: '10px',
                padding: '5px',
                marginTop: '10px',
              }}
              variant="h4"
              gutterBottom
            >
              {jobDetail.title}
            </Typography>
            <Typography
              sx={{ border: '2px dotted black', borderRadius: '10px', padding: '10px' }}
              variant="body1"
              paragraph
            >
              {jobDetail.description}
            </Typography>
            <Typography variant="body2" paragraph>
              Posted by: {jobDetail.posted_by.first_name} {jobDetail.posted_by.last_name}
            </Typography>
            <Typography variant="body2" paragraph>
              Created at: {jobDetail.created_at}
            </Typography>
            <Typography variant="body2" paragraph>
              Updated at: {jobDetail.updated_at}
            </Typography>
            {jobDetail.skills_required.length > 0 && (
              <Typography variant="body2" paragraph>
                Skill Required:{' '}
                {jobDetail.skills_required.map((skill: any) => (
                  <span key={skill.id}>{skill.name}, </span>
                ))}
              </Typography>
            )}

            <Button variant="contained" color="primary" onClick={handleOpen}>
              Apply for Job
            </Button>

            <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Paper elevation={3} sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', p: 4, width: '80%', bgcolor: 'white', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Upload Your Resume to apply for the Job
              </Typography>

              <form onSubmit={handleSubmit(handleApply)}>
                <input
                  type="file"
                  {...register('resume', { required: 'Resume is required' })}
                />
                {touchedFields.resume && errors.resume && (
                  <Typography variant="caption" color="error">
                    {errors.resume.message}
                  </Typography>
                )}

                <Button type="submit" variant="contained" color="primary">
                  Apply
                </Button>

                <Button style={{float:"right",marginTop:"-60px",marginRight:"-20px"}} onClick={handleClose} variant="outlined" color="warning" sx={{ mt: 2 }}>
                  X
                </Button>
              </form>
            </Paper>
          </Fade>
        </Modal>
          </>
        ) : (
          <Typography variant="body1">Loading...</Typography>
        )}
      </Paper>
    </Container>
  );
};

export default JobDetailPage;
