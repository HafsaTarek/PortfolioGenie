import Swal from "sweetalert2";

export const requireAuth = (user, navigate, path, message) => {
  if (!user) {
    Swal.fire({
      title: "Login Required",
      text: message,
      icon: "warning",
      confirmButtonText: "Login Now",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonColor: "#6C63FF",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login", {
          state: { from: path },
        });
      }
    });

    return false;
  }

  navigate(path);
  return true;
};
