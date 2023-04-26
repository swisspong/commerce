import Image from "next/image";
import { Inter } from "next/font/google";
import {
  CurrencyDollarIcon
} from "@heroicons/react/24/outline";
export default function Content() {
  return (
    <div>
      <div className="contentheader">
        <h3>Dashboard Overview</h3>
      </div>
      <div className="contentbody">
        <div className="card">
          <div className="card-header">
            <label>Total Income</label>
            <div className="box-icons">
              <div className="icons">
                <CurrencyDollarIcon />
              </div>
            </div>
          </div>
          <div className="card-body">
            <label>579,000</label>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <label>Total Income</label>
            <div className="box-icons">
              <div className="icons">
                <CurrencyDollarIcon />
              </div>
            </div>
          </div>
          <div className="card-body">
            <label>579,000</label>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <label>Total Income</label>
            <div className="box-icons">
              <div className="icons">
                <CurrencyDollarIcon />
              </div>
            </div>
          </div>
          <div className="card-body">
            <label>579,000</label>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <label>Total Income</label>
            <div className="box-icons">
              <div className="icons">
                <CurrencyDollarIcon />
              </div>
            </div>
          </div>
          <div className="card-body">
            <label>579,000</label>
          </div>
        </div>
      </div>
    </div>
  );
}
