import { Wallet, providers } from "ethers";
import { connect } from "@tableland/sdk";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

const EVENT_SCHEMA = `id int NOT NULL, name text NOT NULL, prizes text, createdAt int, updatedAt int, primary key (id)`;
const EVENT_TABLE_NAME = `eventTable`;
const PRIZE_SCHEMA = `id int NOT NULL, name text NOT NULL, eventId int NOT NULL, amount int NOT NULL, num int NOT NULL, type text, createdAt int, updatedAt int, primary key (id)`;
const PRIZE_TABLE_NAME = `prizeTable`;
const WINNER_SCHEMA = `id int NOT NULL, name text NOT NULL, eventId int NOT NULL, prizeId int NOT NULL, ownerAddress text, detail text, deliverables text, createdAt int, updatedAt int, primary key (id)`;
const WINNER_TABLE_NAME = `winnerTable`;
// const SPONSOR_SCHEMA = `id int NOT NULL, name text NOT NULL, ownerAddress text, fundAddress text, icon text, eventTable text NOT NULL, prizeTable text NOT NULL, winnerTable text NOT NULL, createdAt int, updatedAt int, primary key (id)`;
// const SPONSOR_TABLE_NAME = `sponsorTable`;

// eslint-disable-next-line import/no-anonymous-default-export
export default async function initializeSponsor(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const tableName = process.env.NEXT_PUBLIC_SPONSOR_TABLE_NAME;
    if (!tableName) return;
    const sponsor = req.query.sponsor as string;
    const ownerAddress = req.query.ownerAddress as string;
    const fundAddress = req.query.ownerAddress as string;
    const icon = req.query.icon as string;
    if (!(sponsor && ownerAddress && fundAddress))
      return respondError(req, res, "No valid query");

    const PRIVATE_KEY = process.env.TBL_PRIVATE_KEY;
    const ALCHEMY_API_KEY = process.env.TBL_ALCHEMY;
    if (!(PRIVATE_KEY && ALCHEMY_API_KEY))
      return respondError(req, res, "No valid privateKey or node key");

    const wallet = new Wallet(PRIVATE_KEY);

    // An RPC provider must be provided to establish a connection to the chain
    const provider = new providers.AlchemyProvider("goerli", ALCHEMY_API_KEY);
    // By default, `connect` uses the Tableland testnet validator;
    // it will sign a message using the associated wallet
    const signer = wallet.connect(provider);

    const tableland = await connect({ network: "testnet", signer });

    //create new event/prize/winner table
    const { name: eventTableName } = await tableland.create(
      EVENT_SCHEMA,
      EVENT_TABLE_NAME
    );
    const { name: prizeTableName } = await tableland.create(
      PRIZE_SCHEMA,
      PRIZE_TABLE_NAME
    );
    const { name: winnerTableName } = await tableland.create(
      WINNER_SCHEMA,
      WINNER_TABLE_NAME
    );

    const { rows } = await tableland.read(`SELECT * FROM ${tableName};`);
    const now = Date.now();

    // Insert a row into the table
    const { hash } = await tableland.write(
      `INSERT INTO ${tableName} (id, name, ownerAddress, fundAddress, icon, eventTable, prizeTable, winnerTable, createdAt, updatedAt) VALUES (${
        rows.length
      }, '${sponsor}','${ownerAddress}', '${fundAddress}','${
        icon || ""
      }', '${eventTableName}', '${prizeTableName}', '${winnerTableName}', ${now}, ${now});`
    );
    console.log({ hash });
    res.statusCode = 200;
    res.json({ hash: hash });
    res.end();
  } catch (error) {
    console.log("error", error);
    respondError(req, res, JSON.stringify(error));
  }
}

const respondError = (
  req: NextApiRequest,
  res: NextApiResponse,
  text: string
) => {
  res.statusCode = 500;
  res.json({
    method: req.method,
    error: text,
  });
  res.end();
};
