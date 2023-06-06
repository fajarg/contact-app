import { HiPencilAlt } from "react-icons/hi";
import { BiDetail, BiTrash } from "react-icons/bi";
import { IoIosContact } from "react-icons/io";
import {
  useGetAllContactQuery,
  useGetContactByIdQuery,
  usePutContactMutation,
} from "./redux/contactApiSlice";
import { useState } from "react";

function App() {
  const [id, setId] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    photo: "",
    age: null,
  });
  const { data, isLoading } = useGetAllContactQuery();
  const { data: detail, isFetching } = useGetContactByIdQuery(id);
  const [putContact] = usePutContactMutation();

  const showContactDetail = (id) => {
    window.detail.showModal();
    setId(id);
  };

  const addContact = () => {
    window.add.showModal();
  };

  const editContact = (id) => {
    window.edit.showModal();
    setId(id);
  };

  const processAddContact = () => {};

  const processEditContact = (id) => {
    const data = {
      id: id,
      firstName: form?.firstName ? form.firstName : detail?.data.firstName,
      lastName: form?.lastName ? form.lastName : detail?.data.lastName,
      age: parseInt(form?.age ? form.age : detail?.data.age),
      photo: form?.photo ? form.photo : detail?.data.photo,
    };

    putContact({ ...data });

    setForm((prev) => ({
      ...prev,
      firstName: "",
      lastName: "",
      age: null,
      photo: "",
    }));
  };

  console.log(form);

  return (
    <>
      <div className="shadow-lg bg-base-100 navbar">
        <div className="flex items-center gap-1 px-5 text-xl font-semibold normal-case">
          <div>Contact App</div> <IoIosContact className="text-2xl" />
        </div>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center flex-1 h-[50vh]">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <>
          <div className="p-10 overflow-x-auto">
            <button className="btn btn-outline btn-sm" onClick={addContact}>
              Add Contact
            </button>
            <table className="table mt-7">
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
                        <button
                          className="text-lg btn btn-ghost btn-xs"
                          onClick={() => editContact(data.id)}
                        >
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
        </>
      )}

      {/* add */}
      <dialog id="add" className="modal modal-bottom sm:modal-middle">
        <form method="dialog" className="modal-box">
          <button
            htmlFor="my-modal-3"
            className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
          >
            ✕
          </button>
          {isFetching ? (
            <div className="flex items-center justify-center flex-1">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <>
              <h3 className="text-lg font-bold">Add New Contact</h3>
              <div className="mt-5">
                <h4 className="py-4 font-semibold">Photo url</h4>
                <input
                  type="text"
                  name="photo"
                  placeholder="Photo url"
                  className="w-full input input-bordered"
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, photo: e.target.value }))
                  }
                />
                <div className="flex gap-8">
                  <div>
                    <h4 className="py-4 font-semibold">First Name</h4>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      className="w-full input input-bordered"
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          firstName: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <h4 className="py-4 font-semibold">Last Name</h4>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      className="w-full input input-bordered"
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          lastName: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <h4 className="py-4 font-semibold">Age</h4>
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  className="w-full input input-bordered"
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, age: e.target.value }))
                  }
                />
              </div>
              <div className="modal-action">
                {/* if there is a button in form, it will close the modal */}
                <button
                  className="btn"
                  onClick={() => processEditContact(detail?.data.id)}
                >
                  Add Contact
                </button>
              </div>
            </>
          )}
        </form>
      </dialog>
      {/* add */}

      {/* edit */}
      <dialog id="edit" className="modal modal-bottom sm:modal-middle">
        <form method="dialog" className="modal-box">
          <button
            htmlFor="my-modal-3"
            className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
          >
            ✕
          </button>
          {isFetching ? (
            <div className="flex items-center justify-center flex-1">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <>
              <h3 className="text-lg font-bold">Contact Edit</h3>
              <div className="mt-5">
                <h4 className="py-4 font-semibold">Photo url</h4>
                <input
                  type="text"
                  name="photo"
                  placeholder="Type here"
                  className="w-full input input-bordered"
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, photo: e.target.value }))
                  }
                  defaultValue={detail?.data?.photo}
                />
                <div className="flex gap-8">
                  <div>
                    <h4 className="py-4 font-semibold">First Name</h4>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Type here"
                      className="w-full input input-bordered"
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          firstName: e.target.value,
                        }))
                      }
                      defaultValue={detail?.data?.firstName}
                    />
                  </div>
                  <div>
                    <h4 className="py-4 font-semibold">Last Name</h4>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Type here"
                      className="w-full input input-bordered"
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          lastName: e.target.value,
                        }))
                      }
                      defaultValue={detail?.data?.lastName}
                    />
                  </div>
                </div>
                <h4 className="py-4 font-semibold">Age</h4>
                <input
                  type="number"
                  name="age"
                  placeholder="Type here"
                  className="w-full input input-bordered"
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, age: e.target.value }))
                  }
                  defaultValue={detail?.data?.age}
                />
              </div>
              <div className="modal-action">
                {/* if there is a button in form, it will close the modal */}
                <button
                  className="btn"
                  onClick={() => processEditContact(detail?.data.id)}
                >
                  Update
                </button>
              </div>
            </>
          )}
        </form>
      </dialog>
      {/* edit */}

      {/* detail */}
      <dialog id="detail" className="modal modal-bottom sm:modal-middle">
        <form method="dialog" className="modal-box">
          {isFetching ? (
            <div className="flex items-center justify-center flex-1">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <>
              <button
                htmlFor="my-modal-3"
                className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
              >
                ✕
              </button>
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
