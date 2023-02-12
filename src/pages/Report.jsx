import { useContext, useState } from 'react';
// const dmarc = require('dmarc-solution');
// import dmarc from "dmarc-solution"
import {
  Box,
  Collapse,
  Container,
  IconButton,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';
import { Unstable_Grid2 as Grid } from '@mui/material';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { Icon } from '@iconify/react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import { store } from '../reducers/store';
// import dayjs from "dayjs";
dayjs.extend(utc);

function Row({ row }) {
  const [open, setOpen] = useState(false);

  // console.log(row.children);

  // console.log(row.row);
  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" onClick={() => setOpen(!open)}>
            {open ? (
              <Icon icon="mdi:chevron-up" color="inherit" />
            ) : (
              <Icon icon="mdi:chevron-down" color="inherit" />
            )}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Link target="_blank" href={`https://db-ip.com/${row.row.source_ip}`}>{row.row.source_ip}</Link>
        </TableCell>
        <TableCell align="right">{row.row.count}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>

        <TableCell align="right">
          {row.row.policy_evaluated.dkim === 'pass' ? (
            <Typography
              color="lightgreen"
              sx={{
                textTransform: 'uppercase',
              }}
            >
              {row.row.policy_evaluated.dkim}
            </Typography>
          ) : (
            <Typography
              color="error"
              sx={{
                textTransform: 'uppercase',
              }}
            >
              {row.row.policy_evaluated.dkim}
            </Typography>
          )}
        </TableCell>
        <TableCell align="right">
          {row.row.policy_evaluated.spf === 'pass' ? (
            <Typography
              color="lightgreen"
              sx={{
                textTransform: 'uppercase',
              }}
            >
              {row.row.policy_evaluated.spf}
            </Typography>
          ) : (
            <Typography
              color="error"
              sx={{
                textTransform: 'uppercase',
              }}
            >
              {row.row.policy_evaluated.spf}
            </Typography>
          )}
        </TableCell>
        {/* <TableCell align="right">{row.auth_results.spf.result}</TableCell> */}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>Sender Hostname</TableCell>
                    <TableCell align="right">Source IP</TableCell>
                    <TableCell align="right">Volume</TableCell>
                    {/* <TableCell align="right">Compliant?</TableCell>
                    <TableCell align="right">DKIM Verification</TableCell>
                    <TableCell align="right">SPF Verification</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell />
                    <TableCell scope="row">{row.identifiers.header_from}</TableCell>
                    <TableCell scope="row" align="right">
                      {row.row.source_ip}
                    </TableCell>
                    <TableCell scope="row" align="right">
                      {row.row.count}
                    </TableCell>
                    {/* <TableCell component="th" scope="row">
                      {row.row.source_ip}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.row.source_ip}
                    </TableCell> */}
                  </TableRow>
                  {/* <Row row={{ name: "test" }} /> */}
                  {/* <Row row={{ name: "test" }} /> */}
                  {/* <Row row={{ name: "test" }} /> */}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function Report() {
  const { state, dispatch } = useContext(store);
  // const [file, setFile] = useState(null);
  const theme = useTheme();
  let file = state.selectedFile?.data;
  let stats = {
    invalidFlow: 0,
    totalFlows: state.selectedFile?.data.records.length * 2,
  };
  // console.log(stats);
  // console.log(file?.records.length * 2);
  state.selectedFile?.data.records.map(obj => {
    console.log(obj);
    if (obj.row.policy_evaluated.dkim === 'fail') {
      stats.invalidFlow += 1;
    }

    if (obj.row.policy_evaluated.spf === 'fail') {
      stats.invalidFlow += 1;
    }
  });

  return (
    <Box component="main">
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={4}>
          {file && (
            <>
              <Grid xs={12} md={6} lg={4}>
                <Grid container>
                  <Grid xs={12} md={6}>
                    <CircularProgressbar
                      value={stats.invalidFlow}
                      maxValue={stats.totalFlows}
                      text={`${Math.round((stats.invalidFlow / stats.totalFlows) * 100)}%`}
                      styles={buildStyles({
                        pathColor: theme.palette.error.main,
                        textColor: theme.palette.error.main,
                      })}
                    />
                    <Typography variant="caption">Invalid flows, DKIM and SPF invalid</Typography>
                  </Grid>
                  <Grid xs={12} md={6}>
                    <CircularProgressbar
                      value={Math.round(100 - (stats.invalidFlow / stats.totalFlows) * 100)}
                      maxValue={100}
                      text={`${Math.round(100 - (stats.invalidFlow / stats.totalFlows) * 100)}%`}
                      styles={buildStyles({
                        pathColor: theme.palette.success.main,
                        textColor: theme.palette.success.main,
                      })}
                    />
                    <Typography variant="caption">DMARC Correct, DKIM or SPF aligne</Typography>
                  </Grid>
                  {/* <Grid xs={4}>
                  <CircularProgressbar value={66} text={`${66}%`} />
                </Grid> */}
                </Grid>
              </Grid>{' '}
              <Grid xs={12} md={6} lg={4}>
                <Typography variant="h6">Policy Details</Typography>
                <TableContainer component={Paper}>
                  <Table size="small">
                    <TableBody>
                      <TableRow
                        key={0}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell sx={{ fontWeight: 'bold' }}>Policy</TableCell>
                        <TableCell align="right">{file.policy_published.p}</TableCell>
                      </TableRow>
                      <TableRow
                        key={0}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell sx={{ fontWeight: 'bold' }}>Sub-domain policy</TableCell>
                        <TableCell align="right">{file.policy_published.sp}</TableCell>
                      </TableRow>
                      <TableRow
                        key={0}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell sx={{ fontWeight: 'bold' }}>DKIM Alignment</TableCell>
                        <TableCell align="right">
                          {file.policy_published.adkim === 's' ? 'Strict' : 'Other'}{' '}
                        </TableCell>
                      </TableRow>
                      <TableRow
                        key={0}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell sx={{ fontWeight: 'bold' }}>SPF Alignment</TableCell>
                        <TableCell align="right">
                          {file.policy_published.aspf === 's' ? 'Strict' : 'Other'}
                        </TableCell>
                      </TableRow>
                      <TableRow
                        key={0}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell sx={{ fontWeight: 'bold' }}>Percentage</TableCell>
                        <TableCell align="right">{file.policy_published.pct}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid xs={12} md={12} lg={4}>
                <Typography variant="h6">DMARC Report Details</Typography>
                <TableContainer component={Paper}>
                  <Table size="small">
                    <TableBody>
                      <TableRow
                        key={0}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell sx={{ fontWeight: 'bold' }}>Provider</TableCell>
                        <TableCell align="right">{file.report_metadata.org_name}</TableCell>
                      </TableRow>
                      <TableRow
                        key={0}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell sx={{ fontWeight: 'bold' }}>Coverage</TableCell>
                        <TableCell align="right">
                          {`${dayjs
                            .unix(file.report_metadata.date_range.begin)
                            .format('DD-MM-YYYY')}
                        -
                        ${dayjs.unix(file.report_metadata.date_range.end).format('DD-MM-YYYY')}`}
                        </TableCell>
                      </TableRow>
                      <TableRow
                        key={0}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell sx={{ fontWeight: 'bold' }}>Report ID</TableCell>
                        <TableCell align="right">{file.report_metadata.report_id}</TableCell>
                      </TableRow>
                      <TableRow
                        key={0}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell sx={{ fontWeight: 'bold' }}>Email contact</TableCell>
                        <TableCell align="right">{file.report_metadata.email}</TableCell>
                      </TableRow>
                      <TableRow
                        key={0}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell sx={{ fontWeight: 'bold' }}>Extra contact</TableCell>
                        <TableCell align="right" className="wordwrap">
                          <Link
                            className="wordwrap"
                            target="_blank"
                            href={file.report_metadata.extra_contact_info}
                          >
                            {file.report_metadata.extra_contact_info}
                          </Link>
                        </TableCell>
                      </TableRow>
                      <TableRow
                        key={0}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell sx={{ fontWeight: 'bold' }}>Errors</TableCell>
                        <TableCell align="right">
                          {file.report_metadata.error ? String(file.report_metadata.error) : 'None'}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid xs={12}>
                <TableContainer component={Paper}>
                  <Table aria-label="collapsible table">
                    <TableHead>
                      <TableRow
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell />
                        <TableCell>Sending Source</TableCell>
                        <TableCell align="right">Volume</TableCell>
                        <TableCell align="right">DMARC Compliance</TableCell>
                        <TableCell align="right">DKIM Verification</TableCell>
                        <TableCell align="right">SPF Verification</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {file && file.records && file.records.map(obj => <Row row={obj} />)}
                      {/* <Row row={{ name: "test" }} /> */}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
