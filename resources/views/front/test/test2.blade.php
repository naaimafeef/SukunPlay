<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>SukunPlay</title>
    <link rel="icon" type="image/x-icon" href="{{asset('playbutton.svg')}}"/>
    <link rel="stylesheet" href="{{asset('css/app.css')}}">
    <style>
        @font-face {
            font-family: MVAWAHEED;
            src: url('{{ asset('fonts/MVAWAHEED.TTF') }}');
        }

        @font-face {
            font-family: AAMUFKF;
            src: url('{{ asset('fonts/AAMMUFKF.TTF') }}');
        }

        .sdirm {
            direction: rtl;
            font-family: MVAWAHEED;
        }

        .sdira {
            direction: rtl;
            font-family: AAMUFKF;
        }

        html{
            scroll-behavior: smooth;
        }
    </style>

    <script src="{{asset('js/app.js')}}"></script>

</head>
<body>
<div class="text-center">
    screen size:
<p class="block sm:hidden md:hidden lg:hidden xl:hidden ">phone</p>
<p class="hidden sm:block md:hidden lg:hidden xl:hidden ">small</p>
<p class="hidden sm:hidden md:block lg:hidden xl:hidden ">medium</p>
<p class="hidden sm:hidden md:hidden lg:block xl:hidden ">large</p>
<p class="hidden sm:hidden md:hidden lg:hidden xl:block ">extra large</p>
</div>
<div class="block sm:block md:block lg:block xl:block">
    <section class="bg-sukun-official">
        <div class="container mx-auto px-10">
            <div class="flex justify-between pb-4 pt-4">
                <div class="flex rounded-full border-solid border hover:bg-sukungreen-200 focus:bg-sukungreen-200">
                    <div class="p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="21.555" height="21.555"
                             viewBox="0 0 21.555 21.555">
                            <g transform="translate(12.63 7.999)">
                                <path d="M300.421,190a.421.421,0,1,0,.421.421A.421.421,0,0,0,300.421,190Z"
                                      transform="translate(-300 -190)"
                                      fill="#FFFFFF"/>
                            </g>
                            <path
                                d="M21.061,18.68l-5.619-5.619a8.344,8.344,0,0,0,1.4-4.641,8.42,8.42,0,1,0-8.42,8.42,8.345,8.345,0,0,0,4.641-1.4L14.614,17h0l4.065,4.065a1.684,1.684,0,1,0,2.381-2.381Zm-8.2-4.125h0a7.585,7.585,0,1,1,1.692-1.692A7.614,7.614,0,0,1,12.863,14.555Zm.883.382a8.448,8.448,0,0,0,1.19-1.19l1.194,1.194a10.219,10.219,0,0,1-1.19,1.19Zm6.72,5.529a.841.841,0,0,1-1.19,0l-3.738-3.738a11.062,11.062,0,0,0,1.19-1.19l3.738,3.738a.841.841,0,0,1,0,1.19Z"
                                fill="#FFFFFF"/>
                            <g transform="translate(1.684 1.684)">
                                <path
                                    d="M46.736,40a6.736,6.736,0,1,0,6.736,6.736A6.743,6.743,0,0,0,46.736,40Zm0,12.63a5.894,5.894,0,1,1,5.894-5.894A5.9,5.9,0,0,1,46.736,52.63Z"
                                    transform="translate(-40 -40)" fill="#FFFFFF"/>
                            </g>
                            <g transform="translate(7.999 3.368)">
                                <path
                                    d="M195.139,83.245A5.06,5.06,0,0,0,190.421,80a.421.421,0,1,0,0,.842,4.239,4.239,0,0,1,3.932,2.7.421.421,0,1,0,.786-.3Z"
                                    transform="translate(-190 -80)" fill="#FFFFFF"/>
                            </g>
                        </svg>
                    </div>
                    <input placeholder="ހޯދާ" type="text"
                           class="rounded-full rounded-l-none bg-sukun-official text-white hover:bg-sukungreen-200 focus:outline-none focus:bg-sukungreen-200 placeholder-white"
                           style="direction: rtl; padding-right: 15px">
                </div>
                <img src="{{asset('logo.svg')}}" class="">
            </div>
        </div>
    </section>



    <section>
        <div class="container mx-auto px-10">
            <div class="flex justify-between bg-gray-100 mt-10 pt-2 pb-2 pr-8 pl-8 text-sukungreen-600 items-center shadow"
                 style="direction: rtl; font-family: MVAWAHEED">
                <div class="w-1/4 lg:text-2xl md:text-xl text-sm" style="font-family: AAMUFKF">
                    މިއަދުގެ ނަމާދު ވަގުތު
                </div>
                <div class="flex">
                    ފަތިސް
                    <div class="bg-white align-middle mr-2 rounded-sm" style="font-family: '.SF NS'">
                        <p class="pr-2 pl-2">19:34</p>
                    </div>
                </div>
                <div class="flex">
                    މެންދުރު
                    <div class="bg-white align-middle mr-2 rounded-sm" style="font-family: '.SF NS'">
                        <p class="pr-2 pl-2">19:34</p>
                    </div>
                </div>
                <div class="flex">
                    އަސުރު
                    <div class="bg-white align-middle mr-2 rounded-sm" style="font-family: '.SF NS'">
                        <p class="pr-2 pl-2">19:34</p>
                    </div>
                </div>
                <div class="flex">
                    މަޢްރިބު
                    <div class="bg-white align-middle mr-2 rounded-sm" style="font-family: '.SF NS'">
                        <p class="pr-2 pl-2">19:34</p>
                    </div>
                </div>
                <div class="flex">
                    އިޝާ
                    <div class="bg-white align-middle mr-2 rounded-sm" style="font-family: '.SF NS'">
                        <p class="pr-2 pl-2">19:34</p>
                    </div>
                </div>


            </div>

            <div class="flex pt-10">

                <div
                    class="flex w-3/6 mr-8 border-t border-b border-sukungreen-300 sdirm items-center text-sukungreen-600 hover:text-sukungreen-300">
                    <div class="mr-5">
                        <p>ދިވެހިރާއްޖޭގައި ފުރަތަމަ ފަހަރަށް ކޮވިޑަށް މީހަކު ޕޮސިޓިވް ވެއްޖެ</p>
                    </div>
                </div>

                <div class="w-1/6 flex mr-8 align-middle items-center justify-center p-1 ">

                    <div
                        class="flex border border-sukungreen-300 bg-sukungreen-200 hover:bg-sukungreen-100 cursor-pointer text-sukungreen-600">
                        <div style="font-family: MVAWAHEED; direction: rtl;" class="mr-2 pl-4 pt-3 pb-2 ">
                            ހާއްސަ ވީޑިއޯ

                        </div>
                        <div style="" class="pt-2 pb-2 pr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 54 54">
                                <g transform="translate(-19.76 -8.34)">
                                    <circle cx="27" cy="27" r="27" transform="translate(19.76 8.34)" fill="#fff"/>
                                    <circle cx="23.039" cy="23.039" r="23.039" transform="translate(23.721 12.301)"
                                            fill="#06a64f"/>
                                    <path d="M100.116,67.142,81.17,56.46V77.827Z" transform="translate(-40.585 -31.802)"
                                          fill="#fff"/>
                                </g>
                            </svg>

                        </div>
                    </div>

                </div>


                <div
                    class="flex w-2/6 border-t border-b border-sukungreen-300 justify-between items-center sdirm text-sukungreen-600">
                    <div class="bg-sukungreen-200 pt-2 pb-1 mr-3 pr-2 pl-2 rounded-sm cursor-not-allowed">
                        އެންމެ ފަހުގެ ވީޑިއޯ
                    </div>

                    <div class="pt-2 pb-1 mr-3 pr-2 pl-2 hover:bg-gray-200 rounded-sm cursor-pointer ">
                        އެންމެ މަޝްހޫރު
                    </div>

                    <a class="pt-2 pb-1 ml-5 mr-3 pr-2 pl-2 hover:bg-gray-200 rounded-sm cursor-pointer" href="#all">
                        ހުރިހާ ވީޑިއޯ
                    </a>


                </div>


            </div>

            <div class="flex mt-10 shadow-md">
                <div class="w-3/12 bg-cover bg-center"
                     style="height: 500px; background-image: url('{{asset('vertical.jpg')}}')"></div>
                <div class="bg-cover bg-center "
                     style="height: 500px ;width: 500px; background-image: url('https://scontent.fmle1-1.fna.fbcdn.net/v/t15.5256-10/93796045_2874382489313357_4131329724922200064_n.jpg?_nc_cat=103&_nc_sid=f2c4d5&_nc_eui2=AeGpewli4yAOsQg0_12mevXMEVUghrcHzYkRVSCGtwfNidz_cFnilnZsNvHBHikQ4JpZBLxV5UscQAqf4sQJtwYp&_nc_oc=AQnOad56PWFCivFf1ncfqvJ8eYu7BJyKnGzbA2PhRlNXAzj04c33A8N7DSlblrRIoO8&_nc_ht=scontent.fmle1-1.fna&oh=882adb027fce310b84265d8a01fd2962&oe=5EC771B8')"></div>
                <div class="bg-gray-200" style="height: 500px;width: 500px"></div>

            </div>

            <div class="">
                <div class="flex -mx-2 justify-between flex-wrap" style="direction: rtl">
                    <div class=" px-2 pt-10">
                        <div class="bg-cover bg-gray-200 bg-center h-56 w-56 shadow-md "
                             style=""></div>
                    </div>
                    <div class=" px-2 pt-10">
                        <div class="bg-cover bg-center h-56 w-56 relative shadow-md"
                             style="background-image: url('https://scontent.fmle1-1.fna.fbcdn.net/v/t15.5256-10/93796045_2874382489313357_4131329724922200064_n.jpg?_nc_cat=103&_nc_sid=f2c4d5&_nc_eui2=AeGpewli4yAOsQg0_12mevXMEVUghrcHzYkRVSCGtwfNidz_cFnilnZsNvHBHikQ4JpZBLxV5UscQAqf4sQJtwYp&_nc_oc=AQnOad56PWFCivFf1ncfqvJ8eYu7BJyKnGzbA2PhRlNXAzj04c33A8N7DSlblrRIoO8&_nc_ht=scontent.fmle1-1.fna&oh=882adb027fce310b84265d8a01fd2962&oe=5EC771B8')">
                            <div class="">
                                <p class=" absolute inset-x-0 bottom-0 text-center text-white p-2 sdirm shadow-lg"
                                   style="opacity: 1; text-shadow: 1px 1px black">ދިވެހިރާއްޖޭގައި ފުރަތަމަ ފަހަރަށް ކޮވިޑަށް މީހަކު ޕޮސިޓިވް ވެއްޖެ</p>
                            </div>
                        </div>
                    </div>
                    <div class=" px-2 pt-10">
                        <div class="bg-cover bg-center h-56 w-56 relative shadow-md"
                             style="background-image: url('https://scontent.fmle1-1.fna.fbcdn.net/v/t15.5256-10/93796045_2874382489313357_4131329724922200064_n.jpg?_nc_cat=103&_nc_sid=f2c4d5&_nc_eui2=AeGpewli4yAOsQg0_12mevXMEVUghrcHzYkRVSCGtwfNidz_cFnilnZsNvHBHikQ4JpZBLxV5UscQAqf4sQJtwYp&_nc_oc=AQnOad56PWFCivFf1ncfqvJ8eYu7BJyKnGzbA2PhRlNXAzj04c33A8N7DSlblrRIoO8&_nc_ht=scontent.fmle1-1.fna&oh=882adb027fce310b84265d8a01fd2962&oe=5EC771B8')">
                            <div class="">
                                <p class=" absolute inset-x-0 bottom-0 text-center text-white p-2 sdirm shadow-lg"
                                   style="opacity: 1; text-shadow: 1px 1px black">ދިވެހިރާއްޖޭގައި ފުރަތަމަ ފަހަރަށް ކޮވިޑަށް މީހަކު ޕޮސިޓިވް ވެއްޖެ</p>
                            </div>
                        </div>
                    </div>
                    <div class=" px-2 pt-10">
                        <div class="bg-cover bg-center h-56 w-56 relative shadow-md"
                             style="background-image: url('https://scontent.fmle1-1.fna.fbcdn.net/v/t15.5256-10/93796045_2874382489313357_4131329724922200064_n.jpg?_nc_cat=103&_nc_sid=f2c4d5&_nc_eui2=AeGpewli4yAOsQg0_12mevXMEVUghrcHzYkRVSCGtwfNidz_cFnilnZsNvHBHikQ4JpZBLxV5UscQAqf4sQJtwYp&_nc_oc=AQnOad56PWFCivFf1ncfqvJ8eYu7BJyKnGzbA2PhRlNXAzj04c33A8N7DSlblrRIoO8&_nc_ht=scontent.fmle1-1.fna&oh=882adb027fce310b84265d8a01fd2962&oe=5EC771B8')">
                            <div class="">
                                <p class=" absolute inset-x-0 bottom-0 text-center text-white p-2 sdirm shadow-lg"
                                   style="opacity: 1; text-shadow: 1px 1px black">ދިވެހިރާއްޖޭގައި ފުރަތަމަ ފަހަރަށް ކޮވިޑަށް މީހަކު ޕޮސިޓިވް ވެއްޖެ</p>
                            </div>
                        </div>
                    </div>
                    <div class=" px-2 pt-10">
                        <div class="bg-cover bg-center h-56 w-56 relative shadow-md"
                             style="background-image: url('https://scontent.fmle1-1.fna.fbcdn.net/v/t15.5256-10/93796045_2874382489313357_4131329724922200064_n.jpg?_nc_cat=103&_nc_sid=f2c4d5&_nc_eui2=AeGpewli4yAOsQg0_12mevXMEVUghrcHzYkRVSCGtwfNidz_cFnilnZsNvHBHikQ4JpZBLxV5UscQAqf4sQJtwYp&_nc_oc=AQnOad56PWFCivFf1ncfqvJ8eYu7BJyKnGzbA2PhRlNXAzj04c33A8N7DSlblrRIoO8&_nc_ht=scontent.fmle1-1.fna&oh=882adb027fce310b84265d8a01fd2962&oe=5EC771B8')">
                            <div class="">
                                <p class=" absolute inset-x-0 bottom-0 text-center text-white p-2 sdirm shadow-lg"
                                   style="opacity: 1; text-shadow: 1px 1px black">ދިވެހިރާއްޖޭގައި ފުރަތަމަ ފަހަރަށް ކޮވިޑަށް މީހަކު ޕޮސިޓިވް ވެއްޖެ</p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </section>



    <section class="bg-gray-100 mt-10">
        <div class="container mx-auto px-10 " id="all">

            <div class="sdirm pt-10">
                <h1 class="text-sukungreen-600 text-center" style="font-size: 25px">ހުރިހާ ވީޑިއޯ</h1>
            </div>


            <div class="flex -mx-2 flex-wrap justify-between">
                <div class=" px-2 pt-10">
                    <div class="bg-cover bg-center h-56 w-56 relative"
                         style="background-image: url('https://scontent.fmle1-1.fna.fbcdn.net/v/t15.5256-10/93796045_2874382489313357_4131329724922200064_n.jpg?_nc_cat=103&_nc_sid=f2c4d5&_nc_eui2=AeGpewli4yAOsQg0_12mevXMEVUghrcHzYkRVSCGtwfNidz_cFnilnZsNvHBHikQ4JpZBLxV5UscQAqf4sQJtwYp&_nc_oc=AQnOad56PWFCivFf1ncfqvJ8eYu7BJyKnGzbA2PhRlNXAzj04c33A8N7DSlblrRIoO8&_nc_ht=scontent.fmle1-1.fna&oh=882adb027fce310b84265d8a01fd2962&oe=5EC771B8')">
                        <div class="">
                            <p class=" absolute inset-x-0 bottom-0 text-center text-white p-2 sdirm shadow-lg"
                               style="opacity: 1; text-shadow: 1px 1px black">ދިވެހިރާއްޖޭގައި ފުރަތަމަ ފަހަރަށް ކޮވިޑަށް މީހަކު ޕޮސިޓިވް ވެއްޖެ</p>
                        </div>
                    </div>
                </div>

                <div class=" px-2 pt-10">
                    <div class="bg-cover bg-center h-56 w-56 relative"
                         style="background-image: url('https://scontent.fmle1-1.fna.fbcdn.net/v/t15.5256-10/93796045_2874382489313357_4131329724922200064_n.jpg?_nc_cat=103&_nc_sid=f2c4d5&_nc_eui2=AeGpewli4yAOsQg0_12mevXMEVUghrcHzYkRVSCGtwfNidz_cFnilnZsNvHBHikQ4JpZBLxV5UscQAqf4sQJtwYp&_nc_oc=AQnOad56PWFCivFf1ncfqvJ8eYu7BJyKnGzbA2PhRlNXAzj04c33A8N7DSlblrRIoO8&_nc_ht=scontent.fmle1-1.fna&oh=882adb027fce310b84265d8a01fd2962&oe=5EC771B8')">
                        <div class="">
                            <p class=" absolute inset-x-0 bottom-0 text-center text-white p-2 sdirm shadow-lg"
                               style="opacity: 1; text-shadow: 1px 1px black">ދިވެހިރާއްޖޭގައި ފުރަތަމަ ފަހަރަށް ކޮވިޑަށް މީހަކު ޕޮސިޓިވް ވެއްޖެ</p>
                        </div>
                    </div>
                </div>

                <div class=" px-2 pt-10">
                    <div class="bg-cover bg-center h-56 w-56 relative"
                         style="background-image: url('https://scontent.fmle1-1.fna.fbcdn.net/v/t15.5256-10/93796045_2874382489313357_4131329724922200064_n.jpg?_nc_cat=103&_nc_sid=f2c4d5&_nc_eui2=AeGpewli4yAOsQg0_12mevXMEVUghrcHzYkRVSCGtwfNidz_cFnilnZsNvHBHikQ4JpZBLxV5UscQAqf4sQJtwYp&_nc_oc=AQnOad56PWFCivFf1ncfqvJ8eYu7BJyKnGzbA2PhRlNXAzj04c33A8N7DSlblrRIoO8&_nc_ht=scontent.fmle1-1.fna&oh=882adb027fce310b84265d8a01fd2962&oe=5EC771B8')">
                        <div class="">
                            <p class=" absolute inset-x-0 bottom-0 text-center text-white p-2 sdirm shadow-lg"
                               style="opacity: 1; text-shadow: 1px 1px black">ދިވެހިރާއްޖޭގައި ފުރަތަމަ ފަހަރަށް ކޮވިޑަށް މީހަކު ޕޮސިޓިވް ވެއްޖެ</p>
                        </div>
                    </div>
                </div>

                <div class=" px-2 pt-10">
                    <div class="bg-cover bg-center h-56 w-56 relative"
                         style="background-image: url('https://scontent.fmle1-1.fna.fbcdn.net/v/t15.5256-10/93796045_2874382489313357_4131329724922200064_n.jpg?_nc_cat=103&_nc_sid=f2c4d5&_nc_eui2=AeGpewli4yAOsQg0_12mevXMEVUghrcHzYkRVSCGtwfNidz_cFnilnZsNvHBHikQ4JpZBLxV5UscQAqf4sQJtwYp&_nc_oc=AQnOad56PWFCivFf1ncfqvJ8eYu7BJyKnGzbA2PhRlNXAzj04c33A8N7DSlblrRIoO8&_nc_ht=scontent.fmle1-1.fna&oh=882adb027fce310b84265d8a01fd2962&oe=5EC771B8')">
                        <div class="">
                            <p class=" absolute inset-x-0 bottom-0 text-center text-white p-2 sdirm shadow-lg"
                               style="opacity: 1; text-shadow: 1px 1px black">ދިވެހިރާއްޖޭގައި ފުރަތަމަ ފަހަރަށް ކޮވިޑަށް މީހަކު ޕޮސިޓިވް ވެއްޖެ</p>
                        </div>
                    </div>
                </div>

                <div class=" px-2 pt-10">
                    <div class="bg-cover bg-center h-56 w-56 relative"
                         style="background-image: url('https://scontent.fmle1-1.fna.fbcdn.net/v/t15.5256-10/93796045_2874382489313357_4131329724922200064_n.jpg?_nc_cat=103&_nc_sid=f2c4d5&_nc_eui2=AeGpewli4yAOsQg0_12mevXMEVUghrcHzYkRVSCGtwfNidz_cFnilnZsNvHBHikQ4JpZBLxV5UscQAqf4sQJtwYp&_nc_oc=AQnOad56PWFCivFf1ncfqvJ8eYu7BJyKnGzbA2PhRlNXAzj04c33A8N7DSlblrRIoO8&_nc_ht=scontent.fmle1-1.fna&oh=882adb027fce310b84265d8a01fd2962&oe=5EC771B8')">
                        <div class="">
                            <p class=" absolute inset-x-0 bottom-0 text-center text-white p-2 sdirm shadow-lg"
                               style="opacity: 1; text-shadow: 1px 1px black">ދިވެހިރާއްޖޭގައި ފުރަތަމަ ފަހަރަށް ކޮވިޑަށް މީހަކު ޕޮސިޓިވް ވެއްޖެ</p>
                        </div>
                    </div>
                </div>





                <div class=" px-2 pt-10">
                    <div class="h-56 bg-cover bg-center"
                         style="width: 467px; background-image:url('{{asset('horizontal.jpg')}}')">
                    </div>
                </div>

                <div class=" px-2 pt-10">
                    <div class="bg-cover bg-center h-56 w-56 relative"
                         style="background-image: url('https://scontent.fmle1-1.fna.fbcdn.net/v/t15.5256-10/93796045_2874382489313357_4131329724922200064_n.jpg?_nc_cat=103&_nc_sid=f2c4d5&_nc_eui2=AeGpewli4yAOsQg0_12mevXMEVUghrcHzYkRVSCGtwfNidz_cFnilnZsNvHBHikQ4JpZBLxV5UscQAqf4sQJtwYp&_nc_oc=AQnOad56PWFCivFf1ncfqvJ8eYu7BJyKnGzbA2PhRlNXAzj04c33A8N7DSlblrRIoO8&_nc_ht=scontent.fmle1-1.fna&oh=882adb027fce310b84265d8a01fd2962&oe=5EC771B8')">
                        <div class="">
                            <p class=" absolute inset-x-0 bottom-0 text-center text-white p-2 sdirm shadow-lg"
                               style="opacity: 1; text-shadow: 1px 1px black">ދިވެހިރާއްޖޭގައި ފުރަތަމަ ފަހަރަށް ކޮވިޑަށް މީހަކު ޕޮސިޓިވް ވެއްޖެ</p>
                        </div>
                    </div>
                </div>


                <div class=" px-2 pt-10">
                    <div class="bg-cover bg-center h-56 w-56 relative"
                         style="background-image: url('https://scontent.fmle1-1.fna.fbcdn.net/v/t15.5256-10/93796045_2874382489313357_4131329724922200064_n.jpg?_nc_cat=103&_nc_sid=f2c4d5&_nc_eui2=AeGpewli4yAOsQg0_12mevXMEVUghrcHzYkRVSCGtwfNidz_cFnilnZsNvHBHikQ4JpZBLxV5UscQAqf4sQJtwYp&_nc_oc=AQnOad56PWFCivFf1ncfqvJ8eYu7BJyKnGzbA2PhRlNXAzj04c33A8N7DSlblrRIoO8&_nc_ht=scontent.fmle1-1.fna&oh=882adb027fce310b84265d8a01fd2962&oe=5EC771B8')">
                        <div class="">
                            <p class=" absolute inset-x-0 bottom-0 text-center text-white p-2 sdirm shadow-lg"
                               style="opacity: 1; text-shadow: 1px 1px black">ދިވެހިރާއްޖޭގައި ފުރަތަމަ ފަހަރަށް ކޮވިޑަށް މީހަކު ޕޮސިޓިވް ވެއްޖެ</p>
                        </div>
                    </div>
                </div>


                <div class=" px-2 pt-10">
                    <div class="bg-cover bg-center h-56 w-56 relative"
                         style="background-image: url('https://scontent.fmle1-1.fna.fbcdn.net/v/t15.5256-10/93796045_2874382489313357_4131329724922200064_n.jpg?_nc_cat=103&_nc_sid=f2c4d5&_nc_eui2=AeGpewli4yAOsQg0_12mevXMEVUghrcHzYkRVSCGtwfNidz_cFnilnZsNvHBHikQ4JpZBLxV5UscQAqf4sQJtwYp&_nc_oc=AQnOad56PWFCivFf1ncfqvJ8eYu7BJyKnGzbA2PhRlNXAzj04c33A8N7DSlblrRIoO8&_nc_ht=scontent.fmle1-1.fna&oh=882adb027fce310b84265d8a01fd2962&oe=5EC771B8')">
                        <div class="">
                            <p class=" absolute inset-x-0 bottom-0 text-center text-white p-2 sdirm shadow-lg"
                               style="opacity: 1; text-shadow: 1px 1px black">ދިވެހިރާއްޖޭގައި ފުރަތަމަ ފަހަރަށް ކޮވިޑަށް މީހަކު ޕޮސިޓިވް ވެއްޖެ</p>
                        </div>
                    </div>
                </div>


                <div class=" px-2 pt-10">
                    <div class="bg-cover bg-center h-56 w-56 relative"
                         style="background-image: url('https://scontent.fmle1-1.fna.fbcdn.net/v/t15.5256-10/93796045_2874382489313357_4131329724922200064_n.jpg?_nc_cat=103&_nc_sid=f2c4d5&_nc_eui2=AeGpewli4yAOsQg0_12mevXMEVUghrcHzYkRVSCGtwfNidz_cFnilnZsNvHBHikQ4JpZBLxV5UscQAqf4sQJtwYp&_nc_oc=AQnOad56PWFCivFf1ncfqvJ8eYu7BJyKnGzbA2PhRlNXAzj04c33A8N7DSlblrRIoO8&_nc_ht=scontent.fmle1-1.fna&oh=882adb027fce310b84265d8a01fd2962&oe=5EC771B8')">
                        <div class="">
                            <p class=" absolute inset-x-0 bottom-0 text-center text-white p-2 sdirm shadow-lg"
                               style="opacity: 1; text-shadow: 1px 1px black">ދިވެހިރާއްޖޭގައި ފުރަތަމަ ފަހަރަށް ކޮވިޑަށް މީހަކު ޕޮސިޓިވް ވެއްޖެ</p>
                        </div>
                    </div>
                </div>


                <div class=" px-2 pt-10">
                    <div class="bg-cover bg-center h-56 w-56 relative"
                         style="background-image: url('https://scontent.fmle1-1.fna.fbcdn.net/v/t15.5256-10/93796045_2874382489313357_4131329724922200064_n.jpg?_nc_cat=103&_nc_sid=f2c4d5&_nc_eui2=AeGpewli4yAOsQg0_12mevXMEVUghrcHzYkRVSCGtwfNidz_cFnilnZsNvHBHikQ4JpZBLxV5UscQAqf4sQJtwYp&_nc_oc=AQnOad56PWFCivFf1ncfqvJ8eYu7BJyKnGzbA2PhRlNXAzj04c33A8N7DSlblrRIoO8&_nc_ht=scontent.fmle1-1.fna&oh=882adb027fce310b84265d8a01fd2962&oe=5EC771B8')">
                        <div class="">
                            <p class=" absolute inset-x-0 bottom-0 text-center text-white p-2 sdirm shadow-lg"
                               style="opacity: 1; text-shadow: 1px 1px black">ދިވެހިރާއްޖޭގައި ފުރަތަމަ ފަހަރަށް ކޮވިޑަށް މީހަކު ޕޮސިޓިވް ވެއްޖެ</p>
                        </div>
                    </div>
                </div>


                <div class=" px-2 pt-10">
                    <div class="bg-cover bg-center h-56 w-56 relative"
                         style="background-image: url('https://scontent.fmle1-1.fna.fbcdn.net/v/t15.5256-10/93796045_2874382489313357_4131329724922200064_n.jpg?_nc_cat=103&_nc_sid=f2c4d5&_nc_eui2=AeGpewli4yAOsQg0_12mevXMEVUghrcHzYkRVSCGtwfNidz_cFnilnZsNvHBHikQ4JpZBLxV5UscQAqf4sQJtwYp&_nc_oc=AQnOad56PWFCivFf1ncfqvJ8eYu7BJyKnGzbA2PhRlNXAzj04c33A8N7DSlblrRIoO8&_nc_ht=scontent.fmle1-1.fna&oh=882adb027fce310b84265d8a01fd2962&oe=5EC771B8')">
                        <div class="">
                            <p class=" absolute inset-x-0 bottom-0 text-center text-white p-2 sdirm shadow-lg"
                               style="opacity: 1; text-shadow: 1px 1px black">ދިވެހިރާއްޖޭގައި ފުރަތަމަ ފަހަރަށް ކޮވިޑަށް މީހަކު ޕޮސިޓިވް ވެއްޖެ</p>
                        </div>
                    </div>
                </div>


                <div class=" px-2 pt-10">
                    <div class="bg-cover bg-center h-56 w-56 relative"
                         style="background-image: url('https://scontent.fmle1-1.fna.fbcdn.net/v/t15.5256-10/93796045_2874382489313357_4131329724922200064_n.jpg?_nc_cat=103&_nc_sid=f2c4d5&_nc_eui2=AeGpewli4yAOsQg0_12mevXMEVUghrcHzYkRVSCGtwfNidz_cFnilnZsNvHBHikQ4JpZBLxV5UscQAqf4sQJtwYp&_nc_oc=AQnOad56PWFCivFf1ncfqvJ8eYu7BJyKnGzbA2PhRlNXAzj04c33A8N7DSlblrRIoO8&_nc_ht=scontent.fmle1-1.fna&oh=882adb027fce310b84265d8a01fd2962&oe=5EC771B8')">
                        <div class="">
                            <p class=" absolute inset-x-0 bottom-0 text-center text-white p-2 sdirm shadow-lg"
                               style="opacity: 1; text-shadow: 1px 1px black">ދިވެހިރާއްޖޭގައި ފުރަތަމަ ފަހަރަށް ކޮވިޑަށް މީހަކު ޕޮސިޓިވް ވެއްޖެ</p>
                        </div>
                    </div>
                </div>


                <div class=" px-2 pt-10">
                    <div class="bg-cover bg-center h-56 w-56 relative"
                         style="background-image: url('https://scontent.fmle1-1.fna.fbcdn.net/v/t15.5256-10/93796045_2874382489313357_4131329724922200064_n.jpg?_nc_cat=103&_nc_sid=f2c4d5&_nc_eui2=AeGpewli4yAOsQg0_12mevXMEVUghrcHzYkRVSCGtwfNidz_cFnilnZsNvHBHikQ4JpZBLxV5UscQAqf4sQJtwYp&_nc_oc=AQnOad56PWFCivFf1ncfqvJ8eYu7BJyKnGzbA2PhRlNXAzj04c33A8N7DSlblrRIoO8&_nc_ht=scontent.fmle1-1.fna&oh=882adb027fce310b84265d8a01fd2962&oe=5EC771B8')">
                        <div class="">
                            <p class=" absolute inset-x-0 bottom-0 text-center text-white p-2 sdirm shadow-lg"
                               style="opacity: 1; text-shadow: 1px 1px black">ދިވެހިރާއްޖޭގައި ފުރަތަމަ ފަހަރަށް ކޮވިޑަށް މީހަކު ޕޮސިޓިވް ވެއްޖެ</p>
                        </div>
                    </div>
                </div>


                <div class=" px-2 pt-10">
                    <div class="bg-cover bg-center h-56 w-56 relative"
                         style="background-image: url('https://scontent.fmle1-1.fna.fbcdn.net/v/t15.5256-10/93796045_2874382489313357_4131329724922200064_n.jpg?_nc_cat=103&_nc_sid=f2c4d5&_nc_eui2=AeGpewli4yAOsQg0_12mevXMEVUghrcHzYkRVSCGtwfNidz_cFnilnZsNvHBHikQ4JpZBLxV5UscQAqf4sQJtwYp&_nc_oc=AQnOad56PWFCivFf1ncfqvJ8eYu7BJyKnGzbA2PhRlNXAzj04c33A8N7DSlblrRIoO8&_nc_ht=scontent.fmle1-1.fna&oh=882adb027fce310b84265d8a01fd2962&oe=5EC771B8')">
                        <div class="">
                            <p class=" absolute inset-x-0 bottom-0 text-center text-white p-2 sdirm shadow-lg"
                               style="opacity: 1; text-shadow: 1px 1px black">ދިވެހިރާއްޖޭގައި ފުރަތަމަ ފަހަރަށް ކޮވިޑަށް މީހަކު ޕޮސިޓިވް ވެއްޖެ</p>
                        </div>
                    </div>
                </div>


                <div class=" px-2 pt-10">
                    <div class="bg-cover bg-center h-56 w-56 relative"
                         style="background-image: url('https://scontent.fmle1-1.fna.fbcdn.net/v/t15.5256-10/93796045_2874382489313357_4131329724922200064_n.jpg?_nc_cat=103&_nc_sid=f2c4d5&_nc_eui2=AeGpewli4yAOsQg0_12mevXMEVUghrcHzYkRVSCGtwfNidz_cFnilnZsNvHBHikQ4JpZBLxV5UscQAqf4sQJtwYp&_nc_oc=AQnOad56PWFCivFf1ncfqvJ8eYu7BJyKnGzbA2PhRlNXAzj04c33A8N7DSlblrRIoO8&_nc_ht=scontent.fmle1-1.fna&oh=882adb027fce310b84265d8a01fd2962&oe=5EC771B8')">
                        <div class="">
                            <p class=" absolute inset-x-0 bottom-0 text-center text-white p-2 sdirm shadow-lg"
                               style="opacity: 1; text-shadow: 1px 1px black">ދިވެހިރާއްޖޭގައި ފުރަތަމަ ފަހަރަށް ކޮވިޑަށް މީހަކު ޕޮސިޓިވް ވެއްޖެ</p>
                        </div>
                    </div>
                </div>


                <div class=" px-2 pt-10">
                    <div class="bg-cover bg-center h-56 w-56 relative"
                         style="background-image: url('https://scontent.fmle1-1.fna.fbcdn.net/v/t15.5256-10/93796045_2874382489313357_4131329724922200064_n.jpg?_nc_cat=103&_nc_sid=f2c4d5&_nc_eui2=AeGpewli4yAOsQg0_12mevXMEVUghrcHzYkRVSCGtwfNidz_cFnilnZsNvHBHikQ4JpZBLxV5UscQAqf4sQJtwYp&_nc_oc=AQnOad56PWFCivFf1ncfqvJ8eYu7BJyKnGzbA2PhRlNXAzj04c33A8N7DSlblrRIoO8&_nc_ht=scontent.fmle1-1.fna&oh=882adb027fce310b84265d8a01fd2962&oe=5EC771B8')">
                        <div class="">
                            <p class=" absolute inset-x-0 bottom-0 text-center text-white p-2 sdirm shadow-lg"
                               style="opacity: 1; text-shadow: 1px 1px black">ދިވެހިރާއްޖޭގައި ފުރަތަމަ ފަހަރަށް ކޮވިޑަށް މީހަކު ޕޮސިޓިވް ވެއްޖެ</p>
                        </div>
                    </div>
                </div>


                <div class=" px-2 pt-10">
                    <div class="bg-cover bg-center h-56 w-56 relative"
                         style="background-image: url('https://scontent.fmle1-1.fna.fbcdn.net/v/t15.5256-10/93796045_2874382489313357_4131329724922200064_n.jpg?_nc_cat=103&_nc_sid=f2c4d5&_nc_eui2=AeGpewli4yAOsQg0_12mevXMEVUghrcHzYkRVSCGtwfNidz_cFnilnZsNvHBHikQ4JpZBLxV5UscQAqf4sQJtwYp&_nc_oc=AQnOad56PWFCivFf1ncfqvJ8eYu7BJyKnGzbA2PhRlNXAzj04c33A8N7DSlblrRIoO8&_nc_ht=scontent.fmle1-1.fna&oh=882adb027fce310b84265d8a01fd2962&oe=5EC771B8')">
                        <div class="">
                            <p class=" absolute inset-x-0 bottom-0 text-center text-white p-2 sdirm shadow-lg"
                               style="opacity: 1; text-shadow: 1px 1px black">ދިވެހިރާއްޖޭގައި ފުރަތަމަ ފަހަރަށް ކޮވިޑަށް މީހަކު ޕޮސިޓިވް ވެއްޖެ</p>
                        </div>
                    </div>
                </div>

                <div class=" px-2 pt-10">
                    <div class="bg-cover bg-center h-56 w-56 relative"
                         style="background-image: url('https://scontent.fmle1-1.fna.fbcdn.net/v/t15.5256-10/93796045_2874382489313357_4131329724922200064_n.jpg?_nc_cat=103&_nc_sid=f2c4d5&_nc_eui2=AeGpewli4yAOsQg0_12mevXMEVUghrcHzYkRVSCGtwfNidz_cFnilnZsNvHBHikQ4JpZBLxV5UscQAqf4sQJtwYp&_nc_oc=AQnOad56PWFCivFf1ncfqvJ8eYu7BJyKnGzbA2PhRlNXAzj04c33A8N7DSlblrRIoO8&_nc_ht=scontent.fmle1-1.fna&oh=882adb027fce310b84265d8a01fd2962&oe=5EC771B8')">
                        <div class="">
                            <p class=" absolute inset-x-0 bottom-0 text-center text-white p-2 sdirm shadow-lg"
                               style="opacity: 1; text-shadow: 1px 1px black">ދިވެހިރާއްޖޭގައި ފުރަތަމަ ފަހަރަށް ކޮވިޑަށް މީހަކު ޕޮސިޓިވް ވެއްޖެ</p>
                        </div>
                    </div>
                </div>



                <div class=" px-2 pt-10">
                    <div class="h-56 bg-cover bg-center"
                         style="width: 467px; background-image:url('{{asset('horizontal.jpg')}}')">
                    </div>
                </div>


                <div class=" px-2 pt-10">
                    <div class="bg-cover bg-center h-56 w-56 relative"
                         style="background-image: url('https://scontent.fmle1-1.fna.fbcdn.net/v/t15.5256-10/93796045_2874382489313357_4131329724922200064_n.jpg?_nc_cat=103&_nc_sid=f2c4d5&_nc_eui2=AeGpewli4yAOsQg0_12mevXMEVUghrcHzYkRVSCGtwfNidz_cFnilnZsNvHBHikQ4JpZBLxV5UscQAqf4sQJtwYp&_nc_oc=AQnOad56PWFCivFf1ncfqvJ8eYu7BJyKnGzbA2PhRlNXAzj04c33A8N7DSlblrRIoO8&_nc_ht=scontent.fmle1-1.fna&oh=882adb027fce310b84265d8a01fd2962&oe=5EC771B8')">
                        <div class="">
                            <p class=" absolute inset-x-0 bottom-0 text-center text-white p-2 sdirm shadow-lg"
                               style="opacity: 1; text-shadow: 1px 1px black">ދިވެހިރާއްޖޭގައި ފުރަތަމަ ފަހަރަށް ކޮވިޑަށް މީހަކު ޕޮސިޓިވް ވެއްޖެ</p>
                        </div>
                    </div>
                </div>


                <div class=" px-2 pt-10">
                    <div class="bg-cover bg-center h-56 w-56 relative"
                         style="background-image: url('https://scontent.fmle1-1.fna.fbcdn.net/v/t15.5256-10/93796045_2874382489313357_4131329724922200064_n.jpg?_nc_cat=103&_nc_sid=f2c4d5&_nc_eui2=AeGpewli4yAOsQg0_12mevXMEVUghrcHzYkRVSCGtwfNidz_cFnilnZsNvHBHikQ4JpZBLxV5UscQAqf4sQJtwYp&_nc_oc=AQnOad56PWFCivFf1ncfqvJ8eYu7BJyKnGzbA2PhRlNXAzj04c33A8N7DSlblrRIoO8&_nc_ht=scontent.fmle1-1.fna&oh=882adb027fce310b84265d8a01fd2962&oe=5EC771B8')">
                        <div class="">
                            <p class=" absolute inset-x-0 bottom-0 text-center text-white p-2 sdirm shadow-lg"
                               style="opacity: 1; text-shadow: 1px 1px black">ދިވެހިރާއްޖޭގައި ފުރަތަމަ ފަހަރަށް ކޮވިޑަށް މީހަކު ޕޮސިޓިވް ވެއްޖެ</p>
                        </div>
                    </div>
                </div>


                <div class=" px-2 pt-10">
                    <div class="bg-cover bg-center h-56 w-56 relative"
                         style="background-image: url('https://scontent.fmle1-1.fna.fbcdn.net/v/t15.5256-10/93796045_2874382489313357_4131329724922200064_n.jpg?_nc_cat=103&_nc_sid=f2c4d5&_nc_eui2=AeGpewli4yAOsQg0_12mevXMEVUghrcHzYkRVSCGtwfNidz_cFnilnZsNvHBHikQ4JpZBLxV5UscQAqf4sQJtwYp&_nc_oc=AQnOad56PWFCivFf1ncfqvJ8eYu7BJyKnGzbA2PhRlNXAzj04c33A8N7DSlblrRIoO8&_nc_ht=scontent.fmle1-1.fna&oh=882adb027fce310b84265d8a01fd2962&oe=5EC771B8')">
                        <div class="">
                            <p class=" absolute inset-x-0 bottom-0 text-center text-white p-2 sdirm shadow-lg"
                               style="opacity: 1; text-shadow: 1px 1px black">ދިވެހިރާއްޖޭގައި ފުރަތަމަ ފަހަރަށް ކޮވިޑަށް މީހަކު ޕޮސިޓިވް ވެއްޖެ</p>
                        </div>
                    </div>
                </div>



            </div>
        </div>
    </section>


</div>

</body>
<footer>
</footer>
</html>
