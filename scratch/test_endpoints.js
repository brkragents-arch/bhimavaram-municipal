async function test() {
  const res1 = await fetch('http://localhost:3000/index.html');
  const html1 = await res1.text();
  console.log('index.html length:', html1.length);
  console.log('index.html Contains 1,45,737:', html1.includes('1,45,737'));
  console.log('index.html Contains 1,24,500:', html1.includes('1,24,500'));
  console.log('index.html Header total voters:', html1.includes('id="header-total-voters">1,45,737'));

  const res2 = await fetch('http://localhost:3000/elections.html');
  const html2 = await res2.text();
  console.log('elections.html length:', html2.length);
  console.log('elections.html contains 1,45,737:', html2.includes('1,45,737'));

  const res3 = await fetch('http://localhost:3000/assets/bhimavaram_52_wards_boundaries.js');
  const js3 = await res3.text();
  console.log('boundaries.js length:', js3.length);
  console.log('boundaries.js contains 145737:', js3.includes('145737'));
}

test().catch(console.error);
