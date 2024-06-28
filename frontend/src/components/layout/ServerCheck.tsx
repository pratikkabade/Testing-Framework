import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";

const RedBanner = ({ onClick }: { onClick: () => void }) => {
    return (
        <nav className="top-0 mt-14 left-0 fixed w-full bg-red-500 hover:brightness-95 px-2 dark:border-gray-700 dark:bg-gray-800 sm:px-4 flex flex-row justify-start cursor-pointer" onClick={onClick}>
            <span>⚠️</span>
        </nav>
    )
}

const GreenBanner = () => {
    return (
        <nav className="top-0 mt-14 left-0 fixed w-full bg-green-500 hover:brightness-95 px-2 dark:border-gray-700 dark:bg-gray-800 sm:px-4 flex flex-row justify-end">
            <span>✅</span>
        </nav>
    )
}

const HiddenGreenBanner = () => {
    return (
        <nav className="top-0 mt-14 left-0 fixed w-full bg-green-500 hover:brightness-95 px-2 dark:border-gray-700 dark:bg-gray-800 sm:px-4 flex flex-row justify-end fade-out2">
            <span>✅</span>
        </nav>
    )
}

export const ServerCheck = () => {
    const [status, setStatus] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [hide, setHide] = useState(false);

    const fetchstatus = async () => {
        const res = await fetch('http://localhost:5000/')
        const values = await res.json()
        setStatus(values.response === '200')
    }

    useEffect(() => {
        fetchstatus()
    }, [])

    setTimeout(() => {
        setHide(true)
    }, 1500);

    return (
        <>
            {
                status ?
                    hide ?
                        <HiddenGreenBanner />
                        :
                        <GreenBanner />
                    :
                    <RedBanner onClick={() => setOpenModal(true)} />
            }

            <Modal show={openModal} onClose={() => setOpenModal(false)} className="fade-in">
                <Modal.Header>⚠️ Server is down</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Please confirm if the server is running from the backend
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => {
                        window.location.reload()
                    }}>Recheck</Button>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                        Ignore
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}