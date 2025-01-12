import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { useCallback, useEffect } from "react";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";

import { toast } from "react-hot-toast";
import useLoginModal from "../../hooks/useLoginModal";
import useRegisterModal from "../../hooks/useRegisterModal";
import useFetch from "../../hooks/useFetch";
import LoadingPage from "../../pages/LoadingPage";
import { useAuthCookies } from "../../hooks/useAuthCookies";
import { LOGIN } from "../../constants/costants";

const LoginModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();


  const { setAuthCookies } = useAuthCookies();
  const { fetchData, data: res, loading } = useFetch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    fetchData({
      url: LOGIN,
      method: "POST",
      data,
    });
  };

  useEffect(() => {
    if (!res) return;

    if (!res.user || !res.token) {
      console.log(res);
      toast.error("somthing went wrong");
      return;
    }

    setAuthCookies(res.token, res.user.id);

    reset();
    loginModal.onClose();
    
    toast.success("logged in");
  }, [res]);

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your Account!" />
      <Input
        id="email"
        label="Email"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        type="password"
        label="Password"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />

      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2">
          <div>First time using Airbnb?</div>
          <div
            onClick={toggle}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Create an account
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) return <LoadingPage />;

  return (
    <Modal
      disabled={loading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
