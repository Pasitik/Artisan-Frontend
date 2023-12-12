import {  ReactElement, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "../App.css";


export const Modal = ({children, xtraclass, hidden}) => {
    const modalref = useRef()

    if (!modalref.current) {
        modalref.current = document.createElement("div")
    }

    useEffect(() => {
        let modalRoot = document.getElementById("modal")

        if (hidden) {
             modalRoot = null
        }

        if (!modalRoot || !modalref.current) {
            return
        }
        modalRoot.appendChild(modalref.current)

        return () => {
            if (modalRoot && modalref.current) {
                modalRoot.removeChild(modalref.current)
            }
        }
    }, [hidden])
  return createPortal(
                <section className={'p-0 m-0 modal ' + xtraclass}>
                {children}
                </section>, modalref.current
            );
}
