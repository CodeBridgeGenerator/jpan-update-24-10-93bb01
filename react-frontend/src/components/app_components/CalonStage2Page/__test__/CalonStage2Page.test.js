import React from "react";
import { render, screen } from "@testing-library/react";

import CalonStage2Page from "../CalonStage2Page";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders calonStage2 page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CalonStage2Page />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("calonStage2-datatable")).toBeInTheDocument();
    expect(screen.getByRole("calonStage2-add-button")).toBeInTheDocument();
});
