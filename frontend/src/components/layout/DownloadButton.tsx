import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { URL } from "../../constants/URL";

export const DownloadButton = ({ app, id }: { app: string, id: string }) => {
    const [isDownloading, setIsDownloading] = useState(false);
    const [noApp, setNoApp] = useState(true)

    useEffect(() => {
        if (app !== '') {
            setNoApp(false)
        }
    }, [app])

    const handleDownload = () => {
        setIsDownloading(true);
        setTimeout(() => {
            const url = `${URL}/${app}/${id}/Download`;
            window.open(url, '_blank');
            setIsDownloading(false);
        }, 1500);
    };

    return (
        <div onClick={handleDownload}>
            <Button disabled={isDownloading || noApp}>
                {isDownloading ? 'Downloading...' : 'Download'}
            </Button>
        </div>
    )
}
