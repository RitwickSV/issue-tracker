"use client";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BsExclamationTriangleFill, BsBackspaceFill } from "react-icons/bs";
import axios from "axios";

interface Props {
  params: { id: string };
}

function Modal({ params }: Props) {
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      {modal && (
        <dialog className="animate-fade fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
          <div className="bg-white m-auto p-8">
            <div className="flex flex-col items-center prose">
              <h3 className="prose">Confirm Action</h3>
              <p>
                Do you really want to delete this issue? This action cannot be
                undone.{" "}
              </p>
              <div className="flex space-x-5">
                <button
                  className="btn btn-accent "
                  onClick={async () => {
                    await axios.delete("/api/issues/" + params.id);
                    router.push("/issues");
                    router.refresh();
                  }}
                >
                  <BsExclamationTriangleFill />
                  Confirm
                </button>
                <button className="btn">
                  <BsBackspaceFill />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}

export default Modal;
