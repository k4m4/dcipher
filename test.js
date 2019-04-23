import test from 'ava';
import m from './';

test('base64', async t => {
	t.is((await m('dW5pY29ybg==')), Buffer.from('dW5pY29ybg==', 'base64').toString('utf8'));
});
test('base64 with timeout', async t => {
	t.is((await m('dW5pY29ybg==', {timeout: 8000})), Buffer.from('dW5pY29ybg==', 'base64').toString('utf8'));
});

test('md5', async t => {
	t.is((await m('1abcb33beeb811dca15f0ac3e47b88d9')), 'unicorn');
});
test('md5 with timeout', async t => {
	t.is((await m('1abcb33beeb811dca15f0ac3e47b88d9', {timeout: 8000})), 'unicorn');
});

test('sha1', async t => {
	t.is((await m('84de6753b298abd027fcd1d790eade2413eafb5a')), 'unicorn');
});
test('sha1 with timeout', async t => {
	t.is((await m('84de6753b298abd027fcd1d790eade2413eafb5a', {timeout: 8000})), 'unicorn');
});

test('sha224', async t => {
	t.is((await m('983d515094574856a57db3a13741f0a65509bb640bfa551e78fa01d9')), 'unicorn');
});
test('sha224 with timeout', async t => {
	t.is((await m('983d515094574856a57db3a13741f0a65509bb640bfa551e78fa01d9', {timeout: 8000})), 'unicorn');
});

test('sha256', async t => {
	t.is((await m('c6cb50e7eea0df1fd3eaf52ada2358f5423afd7c0b5ee2395231a9b3208ffcaf')), 'unicorn');
});
test('sha256 with timeout', async t => {
	t.is((await m('c6cb50e7eea0df1fd3eaf52ada2358f5423afd7c0b5ee2395231a9b3208ffcaf', {timeout: 8000})), 'unicorn');
});

test('sha384', async t => {
	t.is((await m('de41efa2be0844783ea107630a79246fb1f7b3ab97b35c5e4b70130804f876f64b645c1064a775507a7ac3be457539f2')), 'unicorn');
});
test('sha384 with timeout', async t => {
	t.is((await m('de41efa2be0844783ea107630a79246fb1f7b3ab97b35c5e4b70130804f876f64b645c1064a775507a7ac3be457539f2', {timeout: 8000})), 'unicorn');
});

test('sha512', async t => {
	t.is((await m('e233b19aabc7d5e53826fb734d1222f1f0444c3a3fc67ff4af370a66e7cadd2cb24009f1bc86f0bed12ca5fcb226145ad10fc5f650f6ef0959f8aadc5a594b27')), 'unicorn');
});
test('sha512 with timeout', async t => {
	t.is((await m('e233b19aabc7d5e53826fb734d1222f1f0444c3a3fc67ff4af370a66e7cadd2cb24009f1bc86f0bed12ca5fcb226145ad10fc5f650f6ef0959f8aadc5a594b27', {timeout: 8000})), 'unicorn');
});

test('ripemd320', async t => {
	t.is((await m('f4971074a8da200c122c04bc4e0fa96066913d6f38d3397eb61a7341078cd4841386e159993826af')), 'unicorn');
});
test('ripemd320 with timeout', async t => {
	t.is((await m('f4971074a8da200c122c04bc4e0fa96066913d6f38d3397eb61a7341078cd4841386e159993826af', {timeout: 8000})), 'unicorn');
});