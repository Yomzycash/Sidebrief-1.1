import {
	Container,
	InvoiceContainer,
	InvoiceHeader,
	TextContainer,
	Download,
} from "./style";
import { Download as DownloadSvg } from "asset/svg";
import { GeneralTable } from "components/Tables";
import { invoiceColumns } from "./constants";

const mockData = [
	{
		invoiceName: "payment registrations",
		status: "pending",
		amount: 36000,
		date: "11/12/22",
		downloadLink: "#",
	},
	{
		invoiceName: "payment registrations 2",
		status: "completed",
		amount: 25000,
		date: "11/12/22",
		downloadLink: "#",
	},
];

const getSelectedRows = (rows) => {
	console.log(rows);
};

const Payment = () => {
	return (
		<Container>
			<InvoiceContainer>
				<InvoiceHeader>
					<TextContainer>
						<h6>Payment History</h6>
						<p>Download previous invoices</p>
					</TextContainer>
					<Download>
						<DownloadSvg />
						Download all
					</Download>
				</InvoiceHeader>
				<GeneralTable
					columns={invoiceColumns}
					data={mockData}
					getSelectedRows={getSelectedRows}
					selectionRow={true}
				/>
			</InvoiceContainer>
		</Container>
	);
};

export default Payment;
