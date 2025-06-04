import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { MdOutlineDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";


function Home() {
  const [item, setItem] = useState([]);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [searchList, setSearchList] = useState([]);

  const username = localStorage.getItem("username");

  // post a new charachter
  const check_data = () => {
    // check login status
    if (!username) {
      Swal.fire({
        title: "You are not logged in",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    if (image == "" || name == "") {
      Swal.fire({
        title: "all values must be filled",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    axios({
      method: "post",
      url: "https://682199fa259dad2655afc100.mockapi.io/characters3",
      data: {
        image: image,
        name: name,
        username: username,
      },
    }).then((res) => {
      setSearchList([res.data, ...item]);
      setItem([res.data, ...item]);
    });
  };

  // get data
  useEffect(() => {
    fetch(`https://682199fa259dad2655afc100.mockapi.io/characters3`)
      .then((response) => response.json())
      .then((data) => {
        data = data.reverse();
        setSearchList(data);
        console.log(data);
        setItem(data);
      });
  }, []);

  // delete charachter
  const deleteItem = (id) => {
    axios
      .delete(`https://682199fa259dad2655afc100.mockapi.io/characters3/${id}`)
      .then(() => {
        let filteredList = item.filter((del) => {
          return del.id != id;
        });
        setItem(filteredList);
        setSearchList(filteredList);
      });
  };

  return (
    <div className="bg-gray-50 flex flex-col items-center">
      {username && (
        <div>
          <h1 className="text-xl my-3 font-bold">@{username}</h1>
        </div>
      )}

      <div className="lg:flex justify-around items-center lg:w-full">
        <div className="flex flex-col gap-3 mt-3 lg:flex-row lg:items-center lg:justify-around w-full  justify-around">
          <div className={(username == "admin") ? "flex flex-col gap-2 p-3 bg-amber-50 rounded-2xl border-3 lg:w-1/3 text-center" : "hidden"}>
            <h1 className="text-xl font-bold leading-tight tracking-tight">
              Add new card
            </h1>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2 placeholder:text-center"
              placeholder="image"
              required
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2 placeholder:text-center"
              placeholder="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <button
              className="rounded p-1 text-white bg-green-500 hover:bg-green-900 text-center"
              onClick={check_data}
            >
              Add
            </button>
          </div>
        </div>
      </div>

      <div className="lg:w-9/10">
        <ul className="p-5 flex flex-wrap justify-center gap-3">
          {searchList.map((element, index) => (
            <li className="rounded-2xl" key={index}>
              <div className=" flex flex-col justify-around w-[35vh] bg-white rounded-b-2xl pt-2  hover:translate-1 transition delay-50 shadow-2xl rounded-t-2xl">
                <div className="flex flex-col gap-5">
                  <p className="text-center font-bold">{element.name}</p>

                  <p className="text-center text-gray-500">
                    @{element.username}
                  </p>

                  <div className="relative">
                    <img className="rounded-b-2xl" src={element.image} alt="" />

                    {/* delete and update buttons */}
                    <div className="flex justify-around pb-2 w-full  absolute bottom-0">
                      <button
                        className={
                          username == "admin"
                            ? "rounded text-white bg-red-500 hover:bg-red-900 px-1 text-center"
                            : "hidden"
                        }
                        onClick={() => deleteItem(element.id)}
                      >
                        <MdOutlineDelete className="text-3xl w-7 h-7" />
                      </button>
                      <Link
                        to={`UpdateCard/${element.id}`}
                        className={
                          username == "admin"
                            ? "rounded text-white  bg-cyan-500 hover:bg-cyan-900 px-1 text-center"
                            : "hidden"
                        }
                      >
                        <FaRegEdit className="text-3xl w-6" />
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
