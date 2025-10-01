import React, { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import { motion } from "framer-motion";
import { Speech, UsersRoundIcon } from "lucide-react";
import NewInterview from "./NewInterview";
import Dashboard from "../components/Dashboard";

const Home = () => {

    const [defaultView, setDefaultView] = useState(0);

    return (
        <PageWrapper>
            <div className="mb-8 px-10">
                <div className="flex w-full bg-purple-900 rounded-2xl text-gold">
                    <div className={`w-full ${defaultView != 1 && "glass"} border-2 border-transparent`}>
                        <motion.div
                            onClick={() => setDefaultView(0)}
                            className={`${defaultView == 0 && "bg-primary text-white font-bold"}` + "px-4 py-2 flex flex-row-reverse w-full gap-2 justify-center items-center rounded-xl transition-all duration-100"}
                        >
                            <UsersRoundIcon size={20} />
                            Interviewer
                        </motion.div>
                    </div>
                    <div className={`w-full ${defaultView != 1 && "glass"} border-2 border-transparent`}>
                        <motion.div
                            onClick={() => setDefaultView(1)}
                            className={`${defaultView == 1 && "bg-primary text-white font-bold"}` + "px-4 py-2 flex flex-row-reverse w-full gap-2 justify-center items-center rounded-xl transition-all duration-100"}
                        >
                            <UsersRoundIcon size={20} />
                            Interviewer
                        </motion.div>
                    </div>
                </div>
                <div>
                    {defaultView === 0 ? <NewInterview /> : <Dashboard />}
                </div>
            </div>
        </PageWrapper>
    );
};

export default Home;