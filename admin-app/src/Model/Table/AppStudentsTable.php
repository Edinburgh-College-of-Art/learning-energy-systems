<?php
namespace App\Model\Table;

use App\Model\Entity\AppStudent;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * AppStudents Model
 *
 * @property \Cake\ORM\Association\BelongsTo $AppSchools
 */
class AppStudentsTable extends Table
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

        $this->table('app_students');
        $this->displayField('name');
        $this->primaryKey('id');

        $this->belongsTo('AppSchool', [
            'foreignKey' => 'app_school_id',
            'joinType' => 'INNER'
            ]);

        $this->hasMany('AppData');
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
            ->requirePresence('name', 'create')
            ->notEmpty('name');

        $validator
            ->requirePresence('app_school_id', 'create')
            ->notEmpty('app_school_id');

        $validator
            ->add('year', 'valid', ['rule' => 'numeric'])
            ->requirePresence('year', 'create')
            ->notEmpty('year');

        return $validator;
    }

    /**
     * Returns a rules checker object that will be used for validating
     * application integrity.
     *
     * @param \Cake\ORM\RulesChecker $rules The rules object to be modified.
     * @return \Cake\ORM\RulesChecker
     */
    public function buildRules(RulesChecker $rules)
    {
        return $rules;
    }
}
