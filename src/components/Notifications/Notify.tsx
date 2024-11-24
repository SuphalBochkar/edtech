import { useSnackbar } from "notistack";
import { useEffect } from "react";

const CustomMessage = () => {
  return (
    <div className="text-sm md:text-xl flex flex-col gap-2">
      <div>
        <span className="underline font-bold"> AE Practice Tests 6 (2026)</span>{" "}
        will be updated very soon! Do not worry
      </div>
      {/* <div>
        Join our{" "}
        <a
          href="https://t.me/+sYgr_ndeZQIzZTll"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-[#994bff] md:no-underline md:hover:underline"
        >
          Telegram channel {""}
        </a>
        for the latest updates!
      </div>{" "} */}
    </div>
  );
};

const Notify = () => {
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
        <CustomMessage />
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

  return <div></div>;
};

export default Notify;
