import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const port = 3000;

let currentTime = new Date();
currentTime.setMinutes(currentTime.getMinutes() - currentTime.getTimezoneOffset());
currentTime.setSeconds(0);
currentTime.setMilliseconds(0);

let records = [
    {
        id: '1',
        content: 'recordContent1',
        recordTimestamp: currentTime
    }
];

app.get('/records', (req, res) => {
    res.json(records);
});

app.get('/records/:id', (req, res) => {
    const id = req.params.id;

    for (let i = 0; i < records.length; i++) {
        if (records[i].id === id) {
            res.json(records[i]);
            return;
        }
    }

    res.status(404).send('Record not found.');
});

app.post('/records', (req, res) => {
    let record = req.body;

    let now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    now.setSeconds(0);
    now.setMilliseconds(0);

    record.recordTimestamp = new Date(now);

    records.push(record);
    console.log('Record added:');
    console.log(record);
    console.log();

    res.send('Record added.');
});

app.put('/records/:id', (req, res) => {
    const id = req.params.id;
    const newRecord = req.body;

    for (let i = 0; i < records.length; i++) {
        if (records[i].id === id) {
            records[i].content = newRecord.content;

            console.log('Record updated:');
            console.log(records[i]);
            console.log();

            res.send('Record updated');
            return;
        }
    }

    res.status(404).send('Record not found.');
});

app.delete('/records/:id', (req, res) => {
    const id = req.params.id;

    records = records.filter(r => {
        if (r.id !== id) {
            return true;
        }
        return false;
    });

    console.log('Record with id ' + id + ' deleted.\n');
    res.send('Record deleted.');
});

app.listen(port, () => {
    console.log(`App started on port ${port}\n`);
});
