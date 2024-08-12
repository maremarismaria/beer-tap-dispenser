/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import { DispenserDetailTable } from "@/app/components/DispenserDetailTable/DispenserDetailTable";
import { dispenserDetail } from "@/mocks/dispenser-detail";
import "@testing-library/jest-dom";

describe("Dispenser Detail Table", () => {
  it("renders the dispensers table", () => {
    render(<DispenserDetailTable dispenser={dispenserDetail} />);

    const row = screen.getByRole('row', { name: "Opened At Closed At Flow Volume Total Spent" });
    expect(row).toBeInTheDocument();

    dispenserDetail.usages.map(({ opened_at, closed_at, flow_volume, total_spent }) => {{
      const row = screen.getByRole('row', { name: `${opened_at} ${closed_at} ${flow_volume} ${total_spent}` });
      expect(row).toBeInTheDocument();
    }});
  });
});
