import { equal } from 'assert';
import { parseFromIntString, toSatoshi } from './NumberUtils';

const zeroIntString = '0';
const zeroString = '0.00000000';
const zeroNum = 0;
const smallIntString = '1';
const smallString = '0.00000001';
const smallNum = 0.00000001;
const largeIntString = '3000000000000000000';
const largeString = '30000000000';
const largeNum = 30000000000;

describe('NumberUtils tests', () => {
  it('should convert zeroIntString from satoshi to decimal', async () => {
    const result = parseFromIntString(zeroIntString, 8);
    equal('0.00000000', result);
  });
  it('should convert zeroString from decimal to satoshi', async () => {
    const result = toSatoshi(zeroString);
    equal('0', result);
  });
  it('should convert zeroNum from decimal to satoshi', async () => {
    const result = toSatoshi(zeroNum);
    equal('0', result);
  });
  it('should convert smallIntString from satoshi to decimal', async () => {
    const result = parseFromIntString(smallIntString, 8);
    equal('0.00000001', result);
  });
  it('should convert smallString from decimal to satoshi', async () => {
    const result = toSatoshi(smallString);
    equal('1', result);
  });
  it('should convert smallNum from decimal to satoshi', async () => {
    const result = toSatoshi(smallNum);
    equal('1', result);
  });
  it('should convert largeIntString from satoshi to decimal', async () => {
    const result = parseFromIntString(largeIntString, 8);
    equal('30000000000.00000000', result);
  });
  it('should convert largeString from decimal to satoshi', async () => {
    const result = toSatoshi(largeString);
    equal('3000000000000000000', result);
  });
  it('should convert largeNum from decimal to satoshi', async () => {
    const result = toSatoshi(largeNum);
    equal('3000000000000000000', result);
  });
});
