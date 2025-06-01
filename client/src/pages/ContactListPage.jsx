import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Plus,
  Edit,
  Trash2,
  ChevronUp,
  ChevronDown,
  Search,
} from "lucide-react";
import Toast from "bootstrap/js/dist/toast";

import { useContacts } from "../context/ContactContext";
import FormInput from "../components/FormInput";

const columnHelper = createColumnHelper();
const textCol = (accessor, header) =>
  columnHelper.accessor(accessor, {
    header,
    cell: (info) => info.getValue(),
  });

const ContactListPage = () => {
  const { contacts, deleteContact, highlightedContactId } = useContacts();

  const [sorting, setSorting] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [toastMsg, setToastMsg] = useState("");

  const toastRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!toastMsg) return;
    const t = Toast.getOrCreateInstance(toastRef.current);
    t.show();
  }, [toastMsg]);

  const filteredContacts = useMemo(() => {
    if (!searchTerm) return contacts;
    const term = searchTerm.toLowerCase();

    return contacts.filter((c) =>
      [
        c.firstName,
        c.lastName,
        c.email,
        c.phoneNumber,
        c.address,
        c.city,
        c.state,
        c.country,
        c.postalCode,
      ]
        .join("|")
        .toLowerCase()
        .includes(term)
    );
  }, [contacts, searchTerm]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("firstName", {
        header: "First Name",
        cell: (info) => (
          <span data-testid="cell-firstName">{info.getValue()}</span>
        ),
      }),
      textCol("lastName", "Last Name"),
      textCol("email", "Email"),
      textCol("phoneNumber", "Phone"),
      textCol("address", "Address"),
      textCol("city", "City"),
      textCol("state", "State"),
      textCol("country", "Country"),
      textCol("postalCode", "Postal Code"),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        enableSorting: false,
        cell: ({ row }) => (
          <RowActions
            id={row.original.id}
            firstName={row.original.firstName}
            lastName={row.original.lastName}
            onEdit={navigate}
            onDelete={deleteContact}
            notify={(msg) => setToastMsg(msg)}
          />
        ),
      }),
    ],
    [navigate, deleteContact]
  );

  const table = useReactTable({
    data: filteredContacts,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="container">
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onAdd={() => navigate("/contacts/new")}
      />

      <div className="table-responsive">
        <table
          className="table table-hover align-middle"
          aria-label="Contact list"
        >
          <TableHead headerGroups={table.getHeaderGroups()} />
          <TableBody
            rowModel={table.getRowModel()}
            highlightedContactId={highlightedContactId}
            columnsLen={columns.length}
          />
        </table>
      </div>

      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div
          ref={toastRef}
          className="toast"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header">
            <strong className="me-auto">ContactHub</strong>
            <small>just now</small>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body">{toastMsg}</div>
        </div>
      </div>
    </div>
  );
};

const Header = ({ searchTerm, setSearchTerm, onAdd }) => (
  <div className="row mb-2">
    <h1 className="col-sm-4 col-md-5 col-lg-5">Contacts</h1>

    <div className="col-sm-8 col-md-7 col-lg-7 row">
      <div className="col-sm-6 d-flex justify-content-center align-items-center mb-2">
        <FormInput
          id="search"
          placeholder="Search contacts…"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={<Search size={16} />}
        />
      </div>

      <div className="col-sm-6 d-flex justify-content-center align-items-center">
        <button onClick={onAdd} className="btn btn-primary px-5 py-2">
          <Plus size={16} /> Add Contact
        </button>
      </div>
    </div>
  </div>
);

const TableHead = ({ headerGroups }) => (
  <thead className="table-light">
    {headerGroups.map((hg) => (
      <tr key={hg.id}>
        {hg.headers.map((header) => {
          const sorted = header.column.getIsSorted();
          return (
            <th
              key={header.id}
              scope="col"
              tabIndex={0}
              style={{ cursor: "pointer" }}
              onClick={header.column.getToggleSortingHandler()}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") &&
                header.column.getToggleSortingHandler()(e)
              }
              aria-sort={
                sorted === "asc"
                  ? "ascending"
                  : sorted === "desc"
                  ? "descending"
                  : "none"
              }
            >
              <div className="d-flex align-items-center">
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
                {
                  {
                    asc: <ChevronUp size={14} className="ms-1" />,
                    desc: <ChevronDown size={14} className="ms-1" />,
                  }[sorted] ?? null
                }
              </div>
            </th>
          );
        })}
      </tr>
    ))}
  </thead>
);

const TableBody = ({ rowModel, highlightedContactId, columnsLen }) => (
  <tbody>
    {rowModel.rows.length ? (
      rowModel.rows.map((row) => (
        <tr
          key={row.id}
          data-testid="contact-row"
          className={
            row.original.id === highlightedContactId ? "table-primary" : ""
          }
        >
          {row.getVisibleCells().map((cell) => (
            <td key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan={columnsLen} className="text-center text-muted">
          No contacts found. Add some contacts to get started!
        </td>
      </tr>
    )}
  </tbody>
);

const RowActions = ({
  id,
  firstName,
  lastName,
  onEdit,
  onDelete,
  notify,
}) => {
  const handleEdit = useCallback(() => onEdit(`/contacts/edit/${id}`), [onEdit, id]);

  const handleDelete = useCallback(() => {
    const ok = window.confirm(
      `Are you sure you want to delete ${firstName} ${lastName}?`
    );
    if (ok) {
      onDelete(id);
      notify(`Deleted ${firstName} ${lastName}`);
    }
  }, [id, firstName, lastName, onDelete, notify]);

  return (
    <div className="d-flex gap-2">
      <button
        className="btn btn-sm btn-outline-primary"
        onClick={handleEdit}
        aria-label={`Edit contact ${firstName} ${lastName}`}
      >
        <Edit size={16} />
      </button>
      <button
        className="btn btn-sm btn-outline-danger"
        onClick={handleDelete}
        aria-label={`Delete contact ${firstName} ${lastName}`}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

export default ContactListPage;
