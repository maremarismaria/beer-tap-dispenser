/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import { DispensersTable } from "@/app/components/DispensersTable/DispensersTable";
import { dispensers } from "@/mocks/dispensers";
import "@testing-library/jest-dom";

describe("Dispensers Table", () => {
  it("renders the dispensers table", () => {
    render(<DispensersTable dispensers={dispensers} />);

    const row = screen.getByRole('row', { name: "Dispenser ID Status Updated At Details" });
    expect(row).toBeInTheDocument();

    dispensers.map(({ id, status, updated_at }) => {{
      const row = screen.getByRole('row', { name: `${id} ${status} ${updated_at} Detail` });
      expect(row).toBeInTheDocument();
    }});
  });
});
