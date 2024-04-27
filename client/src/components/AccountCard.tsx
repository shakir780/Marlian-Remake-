import { useEffect, useRef } from "react";
import { ACCOUNT_LINKS } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { signOutFailure, signOutSuccess } from "../redux/user/userSlice";

const AccountCard = ({ setOpenAccountCard }) => {
  const dispatch = useDispatch();

  function useOutsideAlerter(ref: React.RefObject<HTMLElement>) {
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setOpenAccountCard(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  const user = useSelector((state) => state.user);

  const Logout = async () => {
    try {
      const res = await fetch("/api/auth/logout");
      const data = await res.json();

      if (data.success === false) {
        dispatch(signOutFailure(data.message));
        return;
      } else {
        dispatch(signOutSuccess(data));
      }
    } catch (error) {
      console.log(error);

      dispatch(signOutFailure(error.message));
    }
  };

  return (
    <div className="flex justify-end px-12 fixed z-50 w-full ">
      <div
        ref={wrapperRef}
        className="w-[270px] h-fit  shadow-xl rounded-sm bg-white border-2 border-gray-200 "
      >
        <div className="flex flex-col gap-4 py-4 px-3">
          <a
            href="/register"
            className="cursor-pointer text-gray-600 hover:opacity-80 capitalize"
          >
            {user?.currentUser === null && (
              <a
                href="/register"
                className="cursor-pointer text-gray-600 hover:opacity-80 capitalize"
              >
                Register
              </a>
            )}
          </a>
          {user?.currentUser === null && (
            <a
              href="/login"
              className="cursor-pointer text-gray-600 hover:opacity-80 capitalize"
            >
              LogIn
            </a>
          )}
          <a
            href="/wishlist"
            className="cursor-pointer text-gray-600 hover:opacity-80 capitalize"
          >
            WishList
          </a>
          <a
            href="/cart"
            className="cursor-pointer text-gray-600 hover:opacity-80 capitalize"
          >
            Cart
          </a>

          {user?.currentUser !== null && (
            <a
              onClick={Logout}
              className="cursor-pointer text-gray-600 hover:opacity-80 capitalize"
            >
              LogOut
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
