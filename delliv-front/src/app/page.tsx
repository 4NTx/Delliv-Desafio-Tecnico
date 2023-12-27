import React from "react";
import { Provider } from "react-redux";
import { reduxStore } from "@/configuracaoRedux";

const Inicio: React.FC = () => {
  return (
    <>
      <div>
        <Provider store={reduxStore} children={<></>}></Provider>
      </div>
    </>
  );
};

export default Inicio;
