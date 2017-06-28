import React from "react";
import { connect } from "react-redux";
import { ListItem, IconButton, Card } from "semantic-react";
import { RemoveButton } from "../components/buttons";
import * as F from "./../form/field";
import * as M from "./meta";
import * as R from "ramda";

const Table = ({
  id,
  table: { name, length, width },
  tables,
  changeName,
  changeDimensions,
  remove,
}) =>
  <ListItem style={{ padding: "3px 0px" }}>
    <Card fluid style={{ padding: "3px 5px" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flex: "1" }}>
          <F.IndependentField
            header="Nazwa"
            type="text"
            autoFocus={true}
            initialValue={name}
            validator={name => M.validateName({ id, name }, tables)}
            onSave={name => changeName({ id, name })}
          />
          <F.IndependentField
            header="Długość"
            type="number"
            label="m"
            labelPosition="right"
            autoFocus="true"
            initialValue={length}
            validator={M.validateDimension}
            onSave={length => changeDimensions({ id, length, width })}
          />
          <F.IndependentField
            header="Szerokość"
            type="number"
            label="m"
            labelPosition="right"
            autoFocus="true"
            initialValue={width}
            validator={M.validateDimension}
            onSave={width => changeDimensions({ id, length, width })}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <RemoveButton onClick={() => remove(id)} />
        </div>
      </div>
    </Card>
  </ListItem>;
export default connect(
  (state, { id }) => ({
    tables: M.all(state),
    table: R.pipe(M.all, M.withId(id))(state),
  }),
  {
    changeName: M.changeTableName,
    changeDimensions: M.changeTableDimensions,
    remove: M.removeTable,
  },
)(Table);
