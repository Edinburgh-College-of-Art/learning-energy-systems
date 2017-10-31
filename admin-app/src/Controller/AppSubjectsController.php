<?php
namespace App\Controller;

use App\Controller\AppController;
/**
 * AppSubjects Controller
 *
 * @property \App\Model\Table\AppDataTable $AppData
 */
class AppSubjectsController extends AppController {
    
    public function initialize() {
        parent::initialize();
        $this->modelClass = false;
        $this->loadModel('AppData');
    }

    public function index() {
        $studentId = $this->request->params['app_student_id'];
        $dat = $this->request->query['date'];
         $this->set('subjects', $this->AppData->find()->select(['id', 'date', 'app_students_unique_id'])->where(['date =' => $dat, 'app_students_unique_id =' => $studentId]));
        $this->set('_serialize', ['subjects']);
    }


    /*
    public function index() {
        $this->set('appData', $this->AppData->find('all'));


        $query = "SELECT `id` as id,`subject` as title,`projector`+`heater`+`computer`+`light` as total FROM `app_data` WHERE `app_students_unique_id`='" . $_GET['id'] . "' and `date`='".$_GET['date']."'";

        $this->set('_serialize', ['appData']);
    }
    */
}

?>