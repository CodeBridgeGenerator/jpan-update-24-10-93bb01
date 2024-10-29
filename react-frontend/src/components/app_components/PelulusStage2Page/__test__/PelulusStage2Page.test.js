import React from "react";
import { render, screen } from "@testing-library/react";

import PelulusStage2Page from "../PelulusStage2Page";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders pelulusStage2 page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PelulusStage2Page />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("pelulusStage2-datatable")).toBeInTheDocument();
    expect(screen.getByRole("pelulusStage2-add-button")).toBeInTheDocument();
});
