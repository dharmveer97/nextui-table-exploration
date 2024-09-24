'use client';

import { gql, useMutation } from '@apollo/client';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from '@nextui-org/react';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

import * as Yup from 'yup';

const UPDATE_DUMMY_DATA = gql`
  mutation UPDATE_DUMMY_DATA($input: UpdateInput) {
    updateDummyData(input: $input) {
      createdAt
      email
      fullName
      id
      status
    }
  }
`;

// Formik validation schema using Yup
const validationSchema = Yup.object({
  id: Yup.string().required('Email is required'),
  fullName: Yup.string()
    .min(3, 'Full name must be at least 3 characters long')
    .required('Full name is required'),
});

export default function AddUserForm({ isOpen, onOpenChange, refetch }) {
  const [updateDummyData, res] = useMutation(UPDATE_DUMMY_DATA);

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      id: '',
      email: 'tesla@example.com',
      fullName: '',
      status: 'sold',
    },
    validationSchema,
    onSubmit: async () => {
      try {
        const { id, email, fullName, status } = formik.values;

        await updateDummyData({
          variables: {
            input: {
              id,
              createdAt: new Date().toISOString(),
              email,
              fullName,
              status: status || 'active',
            },
          },
        });

        Swal.fire({
          title: 'Success!',
          text: 'Data added successfully',
          icon: 'success',
        });

        if (refetch) {
          refetch();
        }
      } catch (error) {
        console.error('Error submitting data:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to submit data',
          showConfirmButton: false,
          timer: 2500,
        });
      }
      onOpenChange(false);
    },
  });

  useEffect(() => {
    if (res?.error) {
      const errorMessage = res?.error || 'Failed to perform action';
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage,
        showConfirmButton: false,
        timer: 2500,
      });
    }
  }, [res?.error]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              New Customer Entry
            </ModalHeader>
            <ModalBody>
              <form onSubmit={formik.handleSubmit}>
                {/* Email Input */}

                <Input
                  label="ID"
                  placeholder="Enter your new ID"
                  type="text"
                  variant="bordered"
                  name="id"
                  value={formik.values.id}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={
                    formik.touched.id && formik.errors.id
                      ? formik.errors.id
                      : ''
                  }
                  helperColor={
                    formik.touched.id && formik.errors.id ? 'error' : 'default'
                  }
                />

                {/* Full Name Input */}
                <Input
                  label="Full Name"
                  placeholder="Enter your full name"
                  type="text"
                  variant="bordered"
                  name="fullName"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={
                    formik.touched.fullName && formik.errors.fullName
                      ? formik.errors.fullName
                      : ''
                  }
                  helperColor={
                    formik.touched.fullName && formik.errors.fullName
                      ? 'error'
                      : 'default'
                  }
                />

                <Input
                  label="Status"
                  placeholder="Enter your new Status"
                  type="text"
                  variant="bordered"
                  name="status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={
                    formik.touched.status && formik.errors.status
                      ? formik.errors.status
                      : ''
                  }
                  helperColor={
                    formik.touched.status && formik.errors.status
                      ? 'error'
                      : 'default'
                  }
                />
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={formik.handleSubmit}>
                Submit
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
