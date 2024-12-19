import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { CustomMessageC1, CustomMessageC2 } from "./CustomMessage";

export function NotifyC1() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!navigator.onLine) {
      enqueueSnackbar("No connection!", {
        variant: "error",
        persist: true,
      });
    } else {
      enqueueSnackbar({
        variant: "default",
        autoHideDuration: 3500,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        action: (snackbarId) => action(snackbarId, closeSnackbar),
      });
    }
  }, [closeSnackbar, enqueueSnackbar]);

  function action(
    snackbarId: string | number,
    closeSnackbar: (id: string | number) => void
  ) {
    return (
      <div className="text-sm md:text-xl mb-2 md:mb-0 flex items-center gap-4">
        <CustomMessageC1 />
        <div className="flex mr-5 cursor-pointer">
          <button
            className="font-bold text-red-500 hover:underline transition-all"
            onClick={() => closeSnackbar(snackbarId)}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return null;
}

export function NotifyC2() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!navigator.onLine) {
      enqueueSnackbar("No connection!", {
        variant: "error",
        persist: true,
      });
    } else {
      enqueueSnackbar({
        variant: "default",
        autoHideDuration: 3500,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        action: (snackbarId) => action(snackbarId, closeSnackbar),
      });
    }
  }, [closeSnackbar, enqueueSnackbar]);

  function action(
    snackbarId: string | number,
    closeSnackbar: (id: string | number) => void
  ) {
    return (
      <div className="text-sm md:text-xl mb-2 md:mb-0 flex items-center gap-4">
        <CustomMessageC2 />
        <div className="flex mr-5 cursor-pointer">
          <button
            className="font-bold text-red-500 hover:underline transition-all"
            onClick={() => closeSnackbar(snackbarId)}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return null;
}
