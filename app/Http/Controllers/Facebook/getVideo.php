<?php

namespace App\Http\Controllers\Facebook;

use App\Facebook\StoreVideo;
use App\Facebook\Thumbnail;
use App\Http\Controllers\Controller;
use Facebook\Exceptions\FacebookSDKException;
use Facebook\Facebook;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class getVideo extends Controller
{
    public function storevideo(){


        try {
            $fb = new Facebook([
                'app_id' => config('app.fb_app_id'),           //Replace {your-app-id} with your app ID
                'app_secret' => config('app.fb_app_secret'),
                'graph_api_version' => config('app.fb_graph_version'),
            ]);

        } catch (FacebookSDKException $e) {

        }


        try {

            // Get your UserNode object, replace {access-token} with your token
            $response = $fb->get('me?fields=videos{thumbnails,description,id,title,source}', config('app.fb_access'));

        } catch (\Facebook\Exceptions\FacebookResponseException $e) {
            // Returns Graph API errors when they occur
            echo 'Graph returned an error: ' . $e->getMessage();
            exit;
        } catch (\Facebook\Exceptions\FacebookSDKException $e) {
            // Returns SDK errors when validation fails or other local issues
            echo 'Facebook SDK returned an error: ' . $e->getMessage();
            exit;
        }

        $me = $response->getGraphUser()['videos'];

        $this->storefbvidz($me);
        $n = 0;

        while (isset($me->getMetaData()['paging']['next'])){
            $n += 1;

            $response = $fb->next($me);
            $me = $response;
            $this->storefbvidz($me);

        }



//        while ()
//        dd($fb->next($me));





        //All that is returned in the response

//        foreach ($me as $n){
//            echo $n['source'];
//            echo "<br>";
//            echo "<br>";
//        }






        return redirect('/');


    }


    public function storefbvidz($data){

        foreach ($data as $n){

            if (!StoreVideo::where('fb_id','=',$n['id'])->exists()){

                DB::beginTransaction();
                $new_video = new StoreVideo();
                try {
                    $new_video->fb_id = $n['id'];
                    $new_video->link = $n['source'];
                    $new_video->desc = $n['description'];
                    $new_video->title = $n['title'];
                    $new_video->save();
                }catch (\Exception $e){
                    DB::rollBack();
                }


                foreach ($n['thumbnails'] as $thumbnail){


                    $new_thumbnail = new Thumbnail();

                    try {
                        $new_thumbnail->video_id = $n['id'];
                        $new_thumbnail->link = $thumbnail['uri'];
                        $new_thumbnail->save();

                    }catch (\Exception $e){

                        DB::rollBack();
                    }

                }


                DB::commit();

            }


        }
    }

    //
}
