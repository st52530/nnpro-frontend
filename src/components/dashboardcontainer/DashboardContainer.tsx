import React, {FunctionComponent, PropsWithChildren} from "react";
import TopMenu from "../menu/TopMenu";


const DashboardContainer: FunctionComponent = (props: PropsWithChildren<any>) => {
    return (
        <div className="d-flex flex-column h-100">
            <section className="flex-shrink-0">
                <header className="">
                    <div className="p-2 border-bottom">
                        <a href="/">
                            <img className="d-block" src="./logo.png" alt="" height="80"/>
                        </a>
                    </div>
                    <TopMenu/>
                </header>
            </section>

            <section className="mt-auto h-100 w-100 d-flex">
                <main className="p-3 w-100 bg-white">
                    <div className="row mb-5">
                        <div className="col">
                            {props.children}
                        </div>
                    </div>
                </main>
            </section>
        </div>)
}

export default DashboardContainer;