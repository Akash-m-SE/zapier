import { toast } from "@/components/ui/use-toast";
import useStore from "@/store";
import { HTTP_STATUS_CODES, HTTP_STATUS_MESSAGES } from "@repo/http-status";

const redirectToLoginPageAndResetContext = (message: string) => {
  toast({
    variant: "destructive",
    title: "Uh oh! Something went wrong.",
    description: message,
  });
  useStore.getState().deleteUserDetails();
  window.location.href = "/login";
};

const handleAccessTokenErrors = (error: any) => {
  const { statusCode, message } = error.response.data;

  if (
    (statusCode === HTTP_STATUS_CODES.INVALID_ACCESS_TOKEN &&
      message === HTTP_STATUS_MESSAGES.INVALID_ACCESS_TOKEN) ||
    (statusCode === HTTP_STATUS_CODES.ACCESS_TOKEN_NOT_FOUND &&
      message === HTTP_STATUS_MESSAGES.ACCESS_TOKEN_NOT_FOUND)
  ) {
    redirectToLoginPageAndResetContext(message);
  }
};

const handleRefreshTokenErrors = (error: any) => {
  const { statusCode, message } = error.response.data;

  if (
    (statusCode === HTTP_STATUS_CODES.INVALID_REFRESH_TOKEN &&
      message === HTTP_STATUS_MESSAGES.INVALID_REFRESH_TOKEN) ||
    (statusCode === HTTP_STATUS_CODES.EXPIRED_REFRESH_TOKEN &&
      message === HTTP_STATUS_MESSAGES.EXPIRED_REFRESH_TOKEN) ||
    (statusCode === HTTP_STATUS_CODES.REFRESH_TOKEN_NOT_FOUND &&
      message === HTTP_STATUS_MESSAGES.REFRESH_TOKEN_NOT_FOUND)
  ) {
    redirectToLoginPageAndResetContext(message);
  }
};

export { handleAccessTokenErrors, handleRefreshTokenErrors };
