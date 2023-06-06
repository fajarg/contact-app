import { HiPencilAlt } from "react-icons/hi";
import { BiDetail, BiTrash } from "react-icons/bi";
import {
  useGetAllContactQuery,
  useGetContactByIdQuery,
} from "./redux/contactApiSlice";
import { useState } from "react";

function App() {
  const [id, setId] = useState(null);
  const { data, isLoading } = useGetAllContactQuery();
  const { data: detail, isFetching } = useGetContactByIdQuery(id);

  const showContactDetail = (id) => {
    window.my_modal_2.showModal();
    setId(id);
  };

  console.log(detail);

  return (
    <>
      <div className="bg-gray-100 shadow-md navbar">
        <div className="px-5 text-xl font-semibold normal-case text-slate-600">
          Contact App
        </div>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center flex-1 h-[50vh]">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="p-10 overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th className="text-center">Photo</th>
                <th className="text-center">First Name</th>
                <th className="text-center">Last Name</th>
                <th className="text-center">Age</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {data?.data?.map((data, index) => {
                return (
                  <tr key={index}>
                    <td className="text-center">
                      <div className="avatar">
                        <div className="w-12 h-12 mask mask-squircle">
                          <img
                            src={`${data.photo}`}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="text-center">{data.firstName}</td>
                    <td className="text-center">{data.lastName}</td>
                    <td className="text-center">
                      <div>{data?.age}</div>
                    </td>
                    <td className="text-center">
                      <button
                        className="text-lg btn btn-ghost btn-xs"
                        onClick={() => showContactDetail(data.id)}
                      >
                        <BiDetail />
                      </button>
                      <button className="text-lg btn btn-ghost btn-xs">
                        <HiPencilAlt />
                      </button>
                      <button className="text-lg btn btn-ghost btn-xs">
                        <BiTrash />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* detail */}
      <dialog id="my_modal_2" className="modal modal-bottom sm:modal-middle">
        <form method="dialog" className="modal-box">
          {isFetching ? (
            <div className="flex items-center justify-center flex-1">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <>
              <h3 className="text-lg font-bold">Contact Detail</h3>
              <div className="mt-5">
                <h4 className="py-4 font-semibold">Photo</h4>
                <div className="avatar">
                  <div className="w-12 h-12 mask mask-squircle">
                    <img
                      src={`${detail?.data?.photo}`}
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </div>
                <div className="flex gap-8">
                  <div>
                    <h4 className="py-4 font-semibold">First Name</h4>
                    <p className="py-1 text-sm">{detail?.data?.firstName}</p>
                  </div>
                  <div>
                    <h4 className="py-4 font-semibold">Last Name</h4>
                    <p className="py-1 text-sm">{detail?.data?.lastName}</p>
                  </div>
                </div>
                <h4 className="py-4 font-semibold">Age</h4>
                <p className="py-1 text-sm">{detail?.data?.age}</p>
              </div>
            </>
          )}
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      {/* detail */}
    </>
  );
}

export default App;
