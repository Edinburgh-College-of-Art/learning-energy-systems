<?php
namespace App\Model\Table;

use App\Model\Entity\AppSchool;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * AppSchool Model
 *
 * @property \Cake\ORM\Association\HasMany $AppQuestions
 * @property \Cake\ORM\Association\HasMany $AppStudents
 */
class AppSchoolTable extends Table
{

    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config)
    {
        parent::initialize($config);

        $this->table('app_school');
        $this->displayField('id');
        $this->primaryKey('id');

        $this->hasMany('AppQuestions');
        $this->hasMany('AppStudents');
    }

    /**
     * Default validation rules.
     *
     * @param \Cake\Validation\Validator $validator Validator instance.
     * @return \Cake\Validation\Validator
     */
    public function validationDefault(Validator $validator)
    {
        $validator
            ->allowEmpty('id', 'create');

        $validator
            ->requirePresence('school_name', 'create')
            ->notEmpty('school_name');

        $validator
            ->requirePresence('password', 'create')
            ->notEmpty('password')
            ->add('password', 'unique', ['rule' => 'validateUnique', 'provider' => 'table']);

        return $validator;
    }
}
