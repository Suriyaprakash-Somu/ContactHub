import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Save } from "lucide-react";
import { useContacts } from "../context/ContactContext";
import { INDIAN_STATES, COUNTRIES } from "../utils/staticData";
import FormInput from "../components/FormInput";
import { z } from "zod";

export const contactSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z.string().regex(/^\+?[0-9\s\-()]{7,20}$/, {
    message: "Phone number must be valid (7-20 digits, may include spaces, hyphens, and parentheses)",
  }),
  address: z.string().min(5, { message: "Address must be at least 5 characters" }),
  city: z.string().min(2, { message: "City must be at least 2 characters" }),
  state: z.string().min(2, { message: "State must be at least 2 characters" }),
  country: z.string().min(2, { message: "Country must be at least 2 characters" }),
  postalCode: z.string().min(3, { message: "Postal code must be at least 3 characters" }),
});

const ContactFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addContact, updateContact, getContact } = useContacts();
  const isEditMode = Boolean(id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
      city: "",
      state: "",
      country: "India",
      postalCode: "",
    },
  });

  useEffect(() => {
    if (isEditMode) {
      const contact = getContact(id);
      if (contact) {
        reset(contact);
      } else {
        navigate("/");
      }
    }
  }, [id, isEditMode, getContact, reset, navigate]);

  const onSubmit = (data) => {
    if (isEditMode) {
      updateContact(id, data);
    } else {
      addContact(data);
    }
    navigate("/");
  };

  return (
    <div className="container">
      <div className="mb-4 d-flex align-items-center">
        <button onClick={() => navigate("/")} className="btn btn-link me-2 text-decoration-none">
          <ArrowLeft size={20} className="me-1" />
          Back
        </button>
        <h1 className="h4 mb-0">{isEditMode ? "Edit Contact" : "Add New Contact"}</h1>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row g-3">
              <div className="col-md-6">
                <FormInput
                  id="firstName"
                  label="First Name"
                  type="text"
                  register={register}
                  error={errors.firstName}
                  autoFocus
                />
              </div>

              <div className="col-md-6">
                <FormInput
                  id="lastName"
                  label="Last Name"
                  type="text"
                  register={register}
                  error={errors.lastName}
                />
              </div>

              <div className="col-md-6">
                <FormInput
                  id="email"
                  label="Email"
                  type="email"
                  register={register}
                  error={errors.email}
                />
              </div>

              <div className="col-md-6">
                <FormInput
                  id="phoneNumber"
                  label="Phone Number"
                  type="tel"
                  register={register}
                  error={errors.phoneNumber}
                  placeholder="+91 9876543210 "
                />
              </div>

              <div className="col-12">
                <FormInput
                  id="address"
                  label="Address"
                  type="text"
                  register={register}
                  error={errors.address}
                />
              </div>

              <div className="col-md-6">
                <FormInput
                  id="city"
                  label="City"
                  type="text"
                  register={register}
                  error={errors.city}
                />
              </div>

              <div className="col-md-6">
                <FormInput
                  id="state"
                  label="State"
                  isSelect
                  options={INDIAN_STATES}
                  register={register}
                  error={errors.state}
                />
              </div>

              <div className="col-md-6">
                <FormInput
                  id="country"
                  label="Country"
                  isSelect
                  options={COUNTRIES}
                  register={register}
                  error={errors.country}
                />
              </div>

              <div className="col-md-6">
                <FormInput
                  id="postalCode"
                  label="Postal Code"
                  type="text"
                  register={register}
                  error={errors.postalCode}
                />
              </div>
            </div>

            <div className="d-flex justify-content-end mt-4">
              <button type="button" onClick={() => navigate("/")} className="btn btn-secondary me-2">
                Cancel
              </button>
              <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                <Save size={18} className="me-1" />
                Save Contact
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactFormPage;
