export const Status = (data: any) => {
    return (
        <>
            {
                data.data === data.id + '|' + 'Running' ?
                    <span
                        className="p-2 w-2 h-2 mr-3 animate- block rounded-full bg-yellow-500 ">
                    </span>
                    :
                    data.data === data.id + '|' + 'True' ?
                        <span
                            className="p-2 w-2 h-2 mr-3 animate- block rounded-full bg-emerald-500 ">
                        </span>
                        :
                        data.data === data.id + '|' + 'not_ran' ?
                            <span
                                className="p-2 w-2 h-2 mr-3 animate- block rounded-full bg-slate-300 ">
                            </span>
                            :
                            <span
                                className="p-2 w-2 h-2 mr-3 animate- block rounded-full bg-red-500 ">
                            </span>
            }
        </>
    )
}