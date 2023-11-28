import RootPageCustom from "common/RootPageCustom";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import '../../assets/scss/custom.scss';
import '../../config';
import { Card, CardBody, CardHeader, Container, Table } from "reactstrap";

const Manual = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    return (
        <RootPageCustom msgStateGet={null} msgStateSet={null}
            componentJsx={
                <React.Fragment>
                    <Container
                        style={{ display: "block" }}
                        fluid
                    >
                        <Card style={{ marginBottom: 0 }}>
                            <CardHeader>
                                <span className="mdi mdi-information-outline"></span> Ketentuan KTA
                            </CardHeader>
                            <CardBody className="bg-light" style={{ paddingTop: "1rem", paddingBottom: "1rem", margin: 0, border: "1px solid #BBB" }}>
                                <Table className="table-ketentuan" style={{ borderCollapse: "collapse", width: "100%" }}>
                                    <tbody>
                                        <tr>
                                            <th style={{ backgroundColor: "#A084DC", color: "white" }} scope="row" colSpan={2}>
                                                1. Skoring Data
                                            </th>
                                        </tr>
                                        <tr>
                                            <td style={{ verticalAlign: "middle", border: "1px solid #ddd" }} scope="row" rowSpan={5}>
                                                Rumus perhitungan data
                                            </td>
                                            <td>
                                                Rumus perhitungan validasi:
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="row">
                                                Transaksi sesama divisi : 0,5 poin
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="row">
                                                Transaksi antar divisi : 1 poin
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="row">
                                                Jumlah transaksi <b>X</b> total karyawan pada divisi yang melakukan transaksi.
                                                <div style={{ fontWeight: 'bold' }} className="text-primary">
                                                    Sebagai contoh: Jumlah Karyawan HRD 30 orang dan yang melakukan transaksi 15 Karyawan, maka 15 : 30 = 0,5 (50%).
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="row">
                                                Rumus Final: (Total Transaksi valid) <b>X</b> (Persentase total Partisipan aktif)
                                            </td>
                                        </tr>
                                        <tr>
                                            <th style={{ backgroundColor: "#A084DC", color: "white" }} scope="row" colSpan={2}>
                                                2. Penerima Penghargaan
                                            </th>
                                        </tr>
                                        <tr>
                                            <td style={{ verticalAlign: "middle", border: "1px solid #ddd" }} scope="row">
                                                Ketentuan penerima penghargaan lebih dari 1X (satu kali)
                                            </td>
                                            <td>
                                                Karyawan yang menerima penghargaan lebih dari 1X (satu kali) maka pada periode berikutnya Karyawan tersebut harus mendapat nilai 2X (dua kali) lipat dari nilai sebelumnya.
                                                Sebagai contoh: periode Januari Abdul mendapat 100 bintang, lalu pada bulan Februari Abdul menerima penghargaan kembali, maka Abdul harus mendapatkan lebih dari 200 bintang.
                                            </td>
                                        </tr>
                                        <tr>
                                            <th style={{ backgroundColor: "#A084DC", color: "white" }} scope="row" colSpan={2}>
                                                3. Hadiah/Reward
                                            </th>
                                        </tr>
                                        <tr>
                                            <th colSpan={2}>
                                                E-Money  (EOM) :
                                            </th>
                                        </tr>
                                        <tr>
                                            <td scope="row" colSpan={2}>
                                                1. Peraih Bintang Terbanyak 1  : 2.000.000,-
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="row" colSpan={2}>
                                                2. Peraih Bintang Terbanyak 2  : 1.000.000,-
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="row" colSpan={2}>
                                                3. Peraih Bintang Terbanyak 3  : 500.000,-
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row" colSpan={2}>
                                                E-Money (EOY) :
                                            </th>
                                        </tr>
                                        <tr>
                                            <td scope="row" colSpan={2}>
                                                1. Peraih Bintang Terbanyak 1 (St Winner) : 4.000.000 + 20 poin KPI
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="row" colSpan={2}>
                                                2. Peraih Bintang Terbanyak 2 (2nd Runner Up) : 3.000.000 + 15 poin KPI
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="row" colSpan={2}>
                                                3. Peraih Bintang Terbanyak 3 (3rd Runner Up) : 1.000.000 + 10 poin KPI
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Container>
                </React.Fragment>
            }
        />
    );
};

export default Manual;
