'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import  {createPortal} from 'react-dom';

export default function Modal({children}:{children:React.ReactNode}) {
    const router = useRouter();
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if(!dialogRef.current?.open) {
            dialogRef.current?.showModal();
        }
    }, []);

    function onDismiss() {
        router.back();
    }
 return createPortal(
    <div>
        <dialog ref={dialogRef} className="modal w-full h-full bg-zinc-900/50"  onClose={onDismiss}>
            {children}
        </dialog>
    </div>,
    document.getElementById('modal-root')!
 );

}