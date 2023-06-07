import { HiPencilAlt } from "react-icons/hi";
import { BiDetail, BiTrash } from "react-icons/bi";
import { IoIosContact } from "react-icons/io";
import {
  useGetAllContactQuery,
  useGetContactByIdQuery,
  usePutContactMutation,
  usePostContactMutation,
  useDeleteContactMutation,
} from "./redux/contactApiSlice";
import { useState } from "react";

function App() {
  const [id, setId] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    photo: "",
    age: "",
  });
  const { data, isLoading } = useGetAllContactQuery();
  const { data: detail, isFetching, refetch } = useGetContactByIdQuery(id);
  const [postContact] = usePostContactMutation();
  const [putContact] = usePutContactMutation();
  const [deleteContact] = useDeleteContactMutation();

  const showContactDetail = (id) => {
    setId(id);
    window.detail.showModal();
    refetch();
  };

  const addContact = () => {
    setForm((prev) => ({
      ...prev,
      firstName: "",
      lastName: "",
      age: null,
      photo: "",
    }));
    window.add.showModal();
  };

  const editContact = (id) => {
    setId(id);
    refetch();
    window.edit.showModal();
  };

  const showDeleteModal = (id) => {
    setId(id);
    window.delete.showModal();
  };

  const processAddContact = () => {
    const data = {
      firstName: form?.firstName,
      lastName: form?.lastName,
      age: parseInt(form?.age),
      photo: form?.photo,
    };

    postContact({ ...data });

    setForm((prev) => ({
      ...prev,
      firstName: "",
      lastName: "",
      age: "",
      photo: "",
    }));
  };

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
      age: "",
      photo: "",
    }));
  };

  const processDeleteContact = (id) => {
    deleteContact(id);
  };

  return (
    <>
      <div className="shadow-lg bg-base-100 navbar">
        <div className="flex items-center gap-1 px-5 text-xl font-semibold normal-case">
          <div>Contact App</div> <IoIosContact className="text-2xl" />
        </div>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center flex-1 h-[50vh]">
          <span
            className="loading loading-spinner loading-lg"
            data-testid="loading-main-data"
          ></span>
        </div>
      ) : (
        <>
          <div className="p-10 overflow-x-auto">
            <button
              name="add"
              className="btn btn-outline btn-sm"
              onClick={addContact}
            >
              Add Contact
            </button>
            <table className="table mt-7">
              {/* head */}
              <thead className="text-sm">
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
                          name="detail"
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
                        <button
                          className="text-lg btn btn-ghost btn-xs"
                          onClick={() => showDeleteModal(data.id)}
                        >
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
            htmlFor="add"
            className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
          >
            ✕
          </button>
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
              value={form?.photo}
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
                  value={form?.firstName}
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
                  value={form?.lastName}
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
              value={form?.age}
            />
          </div>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn" onClick={processAddContact}>
              Add Contact
            </button>
          </div>
        </form>
      </dialog>
      {/* add */}

      {/* edit */}
      <dialog id="edit" className="modal modal-bottom sm:modal-middle">
        <form method="dialog" className="modal-box">
          {isFetching ? (
            <div className="flex items-center justify-center flex-1">
              <span
                className="loading loading-spinner loading-lg"
                data-testid="loading-edit"
              ></span>
            </div>
          ) : (
            <>
              <button
                htmlFor="edit"
                className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
              >
                ✕
              </button>
              <h3 className="text-lg font-bold">Contact Edit</h3>
              <div className="mt-7">
                <small className="text-xs font-semibold text-red-500">
                  Nb: Fill in the form if you want to make a change!
                </small>
                <h4 className="pt-3 pb-4 font-semibold">Photo url</h4>
                <input
                  type="text"
                  name="photo"
                  placeholder={detail?.data?.photo}
                  className="w-full input input-bordered"
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, photo: e.target.value }))
                  }
                  value={form?.photo}
                />
                <div className="flex gap-8">
                  <div>
                    <h4 className="py-4 font-semibold">First Name</h4>
                    <input
                      type="text"
                      name="firstName"
                      placeholder={detail?.data?.firstName}
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
                      placeholder={detail?.data?.lastName}
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
                  placeholder={detail?.data?.age}
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
                htmlFor="detail"
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

      {/* delete */}
      <dialog id="delete" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="text-lg font-bold">Delete Contact!</h3>
          <p className="py-4">Delete this contact?</p>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn" onClick={() => processDeleteContact(id)}>
              Yes, Delete
            </button>
            <button className="btn">No</button>
          </div>
        </form>
      </dialog>
      {/* delete */}
    </>
  );
}

export default App;
