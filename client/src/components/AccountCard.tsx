import { ACCOUNT_LINKS } from "../constants";

const AccountCard = () => {
  return (
    <div className="flex justify-end px-12 fixed z-50 w-full ">
      <div className="w-[270px] h-[200px] shadow-xl rounded-sm bg-white border-2 border-gray-200 ">
        <div className="flex flex-col gap-4 py-4 px-3">
          {ACCOUNT_LINKS?.map((acc) => (
            <a
              href={acc.href}
              className="cursor-pointer text-gray-600 hover:opacity-80 capitalize"
              key={acc.key}
            >
              {acc.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
