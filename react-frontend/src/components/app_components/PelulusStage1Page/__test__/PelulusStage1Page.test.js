import React from "react";
import { render, screen } from "@testing-library/react";

import PelulusStage1Page from "../PelulusStage1Page";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders pelulusStage1 page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PelulusStage1Page />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("pelulusStage1-datatable")).toBeInTheDocument();
    expect(screen.getByRole("pelulusStage1-add-button")).toBeInTheDocument();
});
